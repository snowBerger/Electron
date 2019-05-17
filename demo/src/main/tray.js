// tray.js

var {
  Menu, Tray, app, BrowserWindow
} = require('electron');

const path = require('path');

var appIcon = new Tray(path.join(__dirname, '../static/icon.png'));

const menu = Menu.buildFromTemplate([
  {
    label: '设置',
    click: function () { 
      console.log('click setting')
    } 
  },
  {
    label: '帮助',
    click: function () { 
      console.log('click help')
    } 
  },
  {
    label: '关于',
    click: function () { 
      console.log('click about')
    } 
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
appIcon.setToolTip('tray menu');
appIcon.setContextMenu(menu);
