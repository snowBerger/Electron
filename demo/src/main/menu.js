// menu.js

const { shell, Menu, BrowserWindow } = require('electron')

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
    label: '文件',
    submenu: [
      {
        label: '新建文件',
        accelerator: 'ctrl+n', // 绑定快捷键
        click: function () { // 绑定事件
          console.log('新建文件')
        }
      },
      {
        label: '保存',
        accelerator: 'ctrl+s', // 绑定快捷键
        click: function () {
          console.log('保存文件')
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '复制',
        role: 'copy' // 调用内置角色实现对应功能
      },
      {
        label: '剪切',
        role: 'cut'  // 调用内置角色实现对应功能
      }
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '浏览'
      },
      {
        label: '搜索'
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '我的团队',
        click: function () {
          openWeb('https://gitlab.icarbonx.cn/front-web')
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
    label: 'webView',
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

let menuTemp = Menu.buildFromTemplate(menus)
Menu.setApplicationMenu(menuTemp)