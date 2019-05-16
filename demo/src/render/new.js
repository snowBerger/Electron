// new.js

const path = require('path');
const BrowerWindow = require('electron').remote.BrowserWindow;
const { ipcRenderer } = require('electron');

// ipc通信
let btnNew = document.querySelector('#new');
btnNew.onclick = () => {
  ipcRenderer.send('new', {
    text: 'IPC new window.'
  })
}

// remote
let remoteNew = document.querySelector('#remote-new');
remoteNew.onclick = () => {
  let remoteWin = new BrowerWindow({
    width: 300,
    height: 200
  })
  remoteWin.loadURL(path.join('file:', __dirname, 'new-remote.html'));
  remoteWin.on('close', () => { remoteWin = null });
}
