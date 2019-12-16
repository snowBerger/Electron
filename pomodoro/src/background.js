'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
// import musicServer from './main/musicServer';

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let settingWin

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 280,
    height: 400,
    frame: false,
    resizable: false,
    // transparent: true,
    // opacity: 1.0,
    icon: path.join(__static, 'logo.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Create the setting window.
  settingWin = new BrowserWindow({
    width: 240,
    height: 200,
    frame: false,
    resizable: false,
    parent: win,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
    // load the setting url
    settingWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/setting')
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  settingWin.on('close', e => {
    e.preventDefault()
    settingWin.hide()
  })

  // set Dock icon
  app.dock.setIcon(path.join(__static, 'logo.ico'))

  require('./main/menu')
  require('./main/tray')
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // new musicServer().start();
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// listen quit event.
ipcMain.on('on-quit', (event, data) => {
  // app.quit()
  app.exit()
})

// listen setting window event.
ipcMain.on('open-setting', (event, data) => {
  settingWin.show()
})

ipcMain.on('setting', (event, data) => {
  settingWin.hide()
  // 设置完成，广播消息初始化App
  event.sender.send('initApp', '初始化App')
})

ipcMain.on('cancle', (event, data) => {
  settingWin.hide()
})