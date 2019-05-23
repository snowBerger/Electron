// menu.js

import { app, Menu, shell } from 'electron'

// 菜单项目
const menuTemp = Menu.buildFromTemplate([
  {
    label: 'Pomodoro',
    submenu: [
      {
        label: '我的团队',
        click: function () {
          shell.openExternal('https://github.com/icx-front')
        }
      },
      {
        type: 'separator'
      },
      {
        label: '联系我',
        click: function () {
          shell.openExternal('https://github.com/snowBerger')
        },
      },
      {
        label: '退出',
        accelerator: 'command+q', // 绑定快捷键
        click: function () {
          app.exit()
        }
      }
    ]
  },
  {
    label: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: function () {
          shell.openExternal('https://zh.wikipedia.org/wiki/%E7%95%AA%E8%8C%84%E5%B7%A5%E4%BD%9C%E6%B3%95')
        },
      }
    ]
  }
])

Menu.setApplicationMenu(menuTemp)