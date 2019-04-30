
// const { ipcRenderer } = require('electron');

let openWindow = document.querySelector('#openWindow');
// 渲染进程和渲染进程直接的通信========
openWindow.onclick = function () {
  // 通过广播的形式 通知主进程执行操作
  ipcRenderer.send('openwindow', { name: 'poetries', age: 23 })
  // ======= localstorage传值 =====
  localStorage.setItem('username', 'poetries')
}

// 接收news渲染进程传递回来的消息
ipcRenderer.on('toIndex', (e, data) => {
  console.log('===', data)
})