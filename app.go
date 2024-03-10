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

// App struct
type App struct {
	ctx      context.Context
	session  *send.Session
	syncChan chan struct{}
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
	err = a.session.Connect(answer)
	if err != nil {
		panic(err)
	}
}

func (a *App) GetSDP(n int, paths []string) string {
	fmt.Println(paths)
	lock := sync.Mutex{}
	lock.Lock()
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
	lock.Unlock()
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
