package main

import (
	"context"
	"fmt"
	"path/filepath"
	"sync"

	"github.com/pion/webrtc/v3"
	"github.com/spectre10/fs-cli/lib"
	"github.com/spectre10/fs-cli/session/receive"
	"github.com/spectre10/fs-cli/session/send"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx            context.Context
	sendSession    *send.Session
	receiveSession *receive.Session
	mu             *sync.Mutex
}

type Stats struct {
	TimeTakenSeconds       string `json:"timeTakenSeconds"`
	TotalAmountTransferred string `json:"totalAmountTransferred"`
	AverageSpeedMiB        string `json:"averageSpeedMiB"`
}

type IncStats struct {
	Name  string `json:"name"`
	Total uint64 `json:"total"`
	Sent  uint64 `json:"sent"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		sendSession:    nil,
		receiveSession: nil,
		mu:             &sync.Mutex{},
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) SendOpenFilePicker() []string {
	a.mu.Lock()
	defer a.mu.Unlock()
	res, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		panic(err)
	}
	return res
}

func (a *App) SendConnect(sdp string) {
	answer := webrtc.SessionDescription{}
	err := lib.Decode(sdp, &answer)
	if err != nil {
		panic(err)
	}
	go a.sendSession.Connect(answer)
}

func (a *App) SendGetSDP(n int, paths []string) string {
	fmt.Println(paths)
	a.mu.Lock()
	defer a.mu.Unlock()
	session := send.NewSession(n)
	err := session.SetupConnection(paths)
	if err != nil {
		panic(err)
	}

	sdp, err := session.GenOffer()
	if err != nil {
		panic(err)
	}
	a.sendSession = session
	return sdp
}

func (a *App) SendGetStats() Stats {
	<-a.sendSession.StatsDone
	return Stats{
		fmt.Sprintf("%.2f Seconds", a.sendSession.TimeTakenSeconds),
		a.sendSession.TotalAmountTransferred,
		fmt.Sprintf("%.2f MiB/s", a.sendSession.AverageSpeedMiB),
	}
}

func (a *App) SendGetFiles(files []string) []string {
	if a.sendSession == nil {
		return []string{}
	}
	f := make([]string, len(files))
	for i := range files {
		f[i] = filepath.Base(files[i])
	}
	return f
}

func (a *App) SendGetIncrementalStats() []IncStats {
	a.mu.Lock()
	defer a.mu.Unlock()
	if a.sendSession == nil || a.sendSession.PeerConnection.ICEConnectionState() != webrtc.ICEConnectionStateConnected {
		fmt.Println("Not connected")
		return []IncStats{}
	}
	statsArr := make([]IncStats, len(a.sendSession.Channels))
	for i := range a.sendSession.Channels {
		stats, ok := a.sendSession.PeerConnection.GetStats().GetDataChannelStats(a.sendSession.Channels[i].DC)
		if !ok {
			panic("Error getting stats")
		}
		statsArr[i] = IncStats{
			Total: a.sendSession.Channels[i].Size,
			Sent:  stats.BytesSent - a.sendSession.Channels[i].DC.BufferedAmount(),
			Name:  a.sendSession.Channels[i].Name,
		}

	}
	return statsArr
}

/**************************Receive Methods*****************************/

func (a *App) RecConnect(sdp string) string {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.receiveSession = receive.NewSession()
	err := a.receiveSession.CreateConnection()
	if err != nil {
		panic(err)
	}
	answer := webrtc.SessionDescription{}
	err = lib.Decode(sdp, &answer)
	if err != nil {
		panic(err)
	}

	newsdp, err := a.receiveSession.GenSDP(answer)
	if err != nil {
		panic(err)
	}
	return newsdp
}

func (a *App) RecGetMetadata() []string {
	a.mu.Lock()
	defer a.mu.Unlock()
	<-a.receiveSession.MetadataReady
	var files []string
	for _, j := range a.receiveSession.Channels {
		files = append(files, j.Name)
	}
	return files
}
