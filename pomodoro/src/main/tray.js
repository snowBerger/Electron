// tray.js

import { app, Menu, shell, Tray } from 'electron'
import path from 'path'

// system tray
const appIcon = new Tray(path.join(__static, 'icon.png'));
const menu = Menu.buildFromTemplate([
  {
    label: '设置',
    click: function () {
      settingWin.show()
    }
  },
  {
    label: '帮助',
    click: function () {
      shell.openExternal('https://github.com/snowBerger')
    }
  },
  {
    label: '关于',
    click: function () {
      shell.openExternal('https://zh.wikipedia.org/wiki/%E7%95%AA%E8%8C%84%E5%B7%A5%E4%BD%9C%E6%B3%95')
    }
  },
  {
    label: '退出',
    click: function () {
      app.exit();
    }
  }
])
// 鼠标放上去提示信息
appIcon.setToolTip('pomodoro');
appIcon.setContextMenu(menu);