// render2Render.js

let openWindow = document.querySelector('#render2render');

// 渲染进程和渲染进程直接的通信========
openWindow.onclick = function () {
  // 通过广播的形式 通知主进程执行操作
  ipcRenderer.send('openwindow', { flag: 'render to render', name: 'poetries', age: 23 })
  // ======= localstorage传值 =====
  localStorage.setItem('renderData', JSON.stringify({
    username: 'poetries',
    age: 23
  }))
}

let openWindow2 = document.querySelector('#webContents');

// 渲染进程和渲染进程直接的通信========
openWindow2.onclick = function () {
  // 通过广播的形式 通知主进程执行操作
  ipcRenderer.send('openwindow2', { flag: 'render to render by webContents', name: 'poetries', age: 32 })
}

// 接收news渲染进程传递回来的消息
ipcRenderer.on('toIndex', (e, data) => {
  console.log('===', data)
})