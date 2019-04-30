// main/menu.js
const { Menu, shell, BrowserWindow } = require('electron')

// 当前窗口渲染网页
function openWebView(url) {
  // 获取当前窗口Id
  let win = BrowserWindow.getFocusedWindow()

  // 广播通知渲染进程打开webview
  win.webContents.send('openwebview', url)
}

// 在窗口外打开网页
function openWeb(url) {
  shell.openExternal(url)
}

// 菜单项目
let menus = [
  {
    label: '帮助',
    submenu: [
      {
        label: '我的团队',
        click: function () {
          openWeb('https://github.com/icx-front')
        }
      },
      {
        type: 'separator'
      },
      {
        label: '联系我',
        click: function () {
          openWeb('https://github.com/snowBerger')
        }
      }
    ]
  },
  {
    label: '加载网页',
    submenu: [
      {
        label: '我的团队',
        click: function () {
          openWebView('https://github.com/icx-front')
        }
      },
      {
        type: 'separator' // 分隔符
      },
      {
        label: '联系我',
        click: function () {
          openWebView('https://github.com/snowBerger')
        }
      },
    ]
  },
  {
    label: '视频网站',
    submenu: [
      {
        label: '优酷',
        click: function () {
          openWebView('https://www.youku.com')
        }
      },
      {
        type: 'separator' // 分隔符
      },
      {
        label: '爱奇艺',
        click: function () {
          openWebView('https://www.iqiyi.com/')
        }
      },
      {
        type: 'separator' // 分隔符
      },
      {
        label: '腾讯视频',
        click: function () {
          openWebView('https://v.qq.com/')
        }
      }
    ]
  }
]

let m = Menu.buildFromTemplate(menus)
Menu.setApplicationMenu(m)
