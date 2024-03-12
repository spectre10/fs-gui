package main

import (
	"context"
	"fmt"
	"sync"

	"github.com/pion/webrtc/v3"
	"github.com/spectre10/fs-cli/lib"
	"github.com/spectre10/fs-cli/session/send"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx      context.Context
	session  *send.Session
	syncChan chan struct{}
	mu       *sync.Mutex
}

type Stats struct {
	TimeTakenSeconds       string `json:"timeTakenSeconds"`
	TotalAmountTransferred string `json:"totalAmountTransferred"`
	AverageSpeedMiB        string `json:"averageSpeedMiB"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		session:  nil,
		syncChan: make(chan struct{}, 1),
		mu:       &sync.Mutex{},
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) OpenFilePicker() []string {
	res, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		panic(err)
	}
	return res
}

func (a *App) Connect(sdp string) {
	answer := webrtc.SessionDescription{}
	err := lib.Decode(sdp, &answer)
	if err != nil {
		panic(err)
	}
	go a.session.Connect(answer)
}

func (a *App) GetSDP(n int, paths []string) string {
	fmt.Println(paths)
	a.mu.Lock()
	session := send.NewSession(n)
	err := session.SetupConnection(paths)
	if err != nil {
		panic(err)
	}

	sdp, err := session.GenOffer()
	if err != nil {
		panic(err)
	}
	a.session = session
	a.mu.Unlock()
	return sdp
}

func (a *App) GetStats() Stats {
	<-a.session.StatsDone
	return Stats{
		fmt.Sprintf("%.2f Seconds", a.session.TimeTakenSeconds),
		a.session.TotalAmountTransferred,
		fmt.Sprintf("%.2f MiB/s", a.session.AverageSpeedMiB),
	}
}

type IncStats struct {
	Total uint64 `json:"total"`
	Sent  uint64 `json:"sent"`
}

func (a *App) GetIncrementalStats() []IncStats {
	a.mu.Lock()
	defer a.mu.Unlock()
	fmt.Println("Getting stats...")
	// return "ya"
	if a.session == nil || a.session.PeerConnection.ICEConnectionState() != webrtc.ICEConnectionStateConnected {
		fmt.Println("Not connected")
		return []IncStats{}
	}
	statsArr := make([]IncStats, len(a.session.Channels))
	for i := range a.session.Channels {
		stats, ok := a.session.PeerConnection.GetStats().GetDataChannelStats(a.session.Channels[i].DC)
		if !ok {
			panic("Error getting stats")
		}
		statsArr[i] = IncStats{
			Total: a.session.Channels[i].Size,
			Sent:  stats.BytesSent - a.session.Channels[i].DC.BufferedAmount(),
		}

	}
	return statsArr
}
