const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const http = require('http')

let ollamaPromise = null
function ollamaStart() {
    return new Promise(
        (resolve) => {
            ollamaPromise = spawn(
                'ollama', ['serve']
            )
        }
    )
}

let backendPromise = null
function localServerStart() {
    return new Promise(
        (resolve) => {
            backendPromise = spawn(
                'uvicorn', ['server:app', '--port', '8000'],
                {cwd: path.join(__dirname, '../backend')}
            )
        }
    )
}

function waitForServer(url) {
  return new Promise((resolve) => {
    const check = () => {
      http.get(url, () => resolve())
        .on('error', () => setTimeout(check, 500))
    }
    check()
  })
}

async function createWindow() {
    //App Startup Setup
    //localServerStart()
    //ollamaStart()
    //
    //await waitForServer('http://127.0.0.1:11434')
    //await waitForServer('http://127.0.0.1:8000')

    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('Fictologist/electron/index.html')
}

app.whenReady().then(createWindow)

//app.on('will-quit', () => {
//  if (backendProcess) backendProcess.kill()
//  if (ollamaProcess) ollamaProcess.kill()
//})