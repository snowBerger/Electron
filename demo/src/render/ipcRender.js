// ipcRender.js

let send = document.querySelector('#send');
send.onclick = function () {
  // 传递消息给主进程
  // 异步
  ipcRenderer.send('sendMsg', { flag: 'send', name: 'poetries', age: 23 })
}

let sendFeedback = document.querySelector('#sendFeedback');
// 向主进程发送消息
sendFeedback.onclick = function () {
  // 触发主进程里面的方法
  ipcRenderer.send('sendFeedback', { flag: 'sendFeedback', name: 'poetries', age: 23 })
}
// 向主进程发送消息后，接收主进程广播的事件
ipcRenderer.on('sendFeedbackToRender', (e, data) => {
  console.log('event\n ', e)
  console.log('data\n ', data)
})

let sendSync = document.querySelector('#sendSync');
// 渲染进程和主进程同步通信
sendSync.onclick = function () {
  // 同步广播数据
  let msg = ipcRenderer.sendSync('sendsync', { flag: 'sendSync', name: 'poetries', age: 23 })

  // 同步返回主进程反馈的数据
  console.log('msg\n ', msg)
}
