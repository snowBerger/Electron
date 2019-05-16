// new.js

const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')


// 接收new events
ipcMain.on('new', (event, data) => {
  // console.log(event, data)
  let newWindow = new BrowserWindow({
    width: 300,
    height: 300,
  })
  newWindow.loadURL(path.join('file:', __dirname, '../new.html'));
  newWindow.on('close', () => { newWindow = null });
})