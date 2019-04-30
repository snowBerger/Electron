const { ipcRenderer } = require('electron');
// 注意这里 在渲染进程中需要从remote中获取BrowserWindow
const BrowerWindow = require('electron').remote.BrowserWindow;

let username = localStorage.getItem('username')
console.log(username)

// 监听主进程传递过来的数据 
ipcRenderer.on('toNews', (e, userInfo, winId) => {
  console.log(userInfo, winId)
  // windID 第一个窗口ID
  // 获取对应ID的窗口
  let firstWin = BrowerWindow.fromId(winId)
  firstWin.webContents.send('toIndex', '来自news进程反馈的信息')
})