// shortCut.js

const { globalShortcut, app } = require('electron')

app.on('ready', () => {
  // 注册全局快捷键
  globalShortcut.register('command+r', () => {
    console.log('command+r')
  })

  // 检测快捷键是否注册成功 true是注册成功
  let isRegister = globalShortcut.isRegistered('command+r')
  console.log(isRegister)
})

// 退出的时候取消全局快捷键
app.on('will-quit', () => {
  globalShortcut.unregister('command+r')
})