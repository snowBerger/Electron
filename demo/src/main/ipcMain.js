// ipcMain.js

const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')

// 主进程处理渲染进程广播数据
ipcMain.on('sendMsg', (event, data) => {
  console.log('data\n ', data)
  // console.log('event\n ', event)
})

// 主进程处理渲染进程广播数据，并反馈给渲染进程
ipcMain.on('sendFeedback', (event, data) => {
  console.log('data\n ', data)
  // console.log('event\n ', event)

  // 主进程给渲染进程广播数据
  setTimeout(() => {
    event.sender.send('sendFeedbackToRender', '来自主进程的反馈')
  }, 2000)
})

// 渲染进程和主进程同步通信 接收同步广播
ipcMain.on('sendsync', (event, data) => {
  console.log('data\n ', data)
  // console.log('event\n ', event)
  // 主进程给渲染进程广播数据
  event.returnValue = '渲染进程和主进程同步通信 接收同步广播，来自主进程的反馈.';
})

// 接收到广播
ipcMain.on('openwindow', (e, data) => {
  // 调用window打开新窗口
  let renderWin = new BrowserWindow({
    width: 400,
    height: 300,
  });
  renderWin.loadURL(path.join('file:', __dirname, '../render2render.html'));
  renderWin.webContents.openDevTools()
  renderWin.on('closed', () => {
    renderWin = null;
  });
})

// 接收到广播
ipcMain.on('openwindow2', (e, data) => {
  // 获取当前窗口ID 放在第一行保险  因为后面也打开了新窗口使得获取的ID有问题
  const winId = BrowserWindow.getFocusedWindow().id

  // 调用window打开新窗口
  let renderWin2 = new BrowserWindow({
    width: 400,
    height: 300,
  });
  renderWin2.loadURL(path.join('file:', __dirname, '../renderWebContents.html'));

  // 新开窗口调试模式
  renderWin2.webContents.openDevTools()

  // 把渲染进程传递过来的数据再次传递给渲染进程news
  // 等待窗口加载完
  renderWin2.webContents.on('did-finish-load', () => [
    renderWin2.webContents.send('toNews', data, winId)
  ])

  renderWin2.on('closed', () => {
    renderWin2 = null;
  });
})