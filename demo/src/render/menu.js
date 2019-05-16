// menu.js

// 在渲染进程中通过remote模块调用主进程中的模块
const { remote } = require('electron')
const { Menu } = remote

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
  }
]

let menuTemp = Menu.buildFromTemplate(menus)
// Menu.setApplicationMenu(menuTemp)

// 绑定右键菜单
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menuTemp.popup({
    window: remote.getCurrentWindow()
  })
}, false)
