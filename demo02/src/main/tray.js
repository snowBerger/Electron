// tray.js

// src/main/tray.js
var {
  Menu, Tray, app, BrowserWindow
} = require('electron');

const path = require('path');

var appIcon = new Tray(path.join(__dirname, '../static/lover.png'));

const menu = Menu.buildFromTemplate([
  {
    label: '设置',
    click: function () { } //打开相应页面 
  },
  {
    label: '帮助',
    click: function () { }
  },
  {
    label: '关于',
    click: function () { }
  },
  {
    label: '退出',
    click: function () {
      // BrowserWindow.getFocusedWindow().webContents().send('close-main-window');
      app.quit();
    }
  }
])

// 鼠标放上去提示信息
appIcon.setToolTip('hello poetries');
appIcon.setContextMenu(menu);

// 实现点击关闭按钮，让应用保存在托盘里面，双击托盘打开
// let win = BrowserWindow.getFocusedWindow()

// win.on('close', (e) => {
//   e.preventDefault()
//   win.hide()
// })

// appIcon.on('double-click', (e) => {
//   win.show()
// })
