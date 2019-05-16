// notification.js

document.querySelector('#showNotification').onclick = function () {
  let myNotification = new window.Notification('系统通知', {
    title: 'electron 通知API',
    body: 'hello poetries',
    icon: path.join('../static/lover.png') // 通知图标
  })

  // 消息可点击
  myNotification.onclick = function () {
    console.log('click notification')
  }
}

// 监听网络变化
// 端开网络 再次连接测试
window.addEventListener('online', function () {
  console.log('online')
});

window.addEventListener('offline', function () {
  console.log('offline')
  // 断开网络触发事件
  const options = {
    title: 'Hello',
    body: '网络异常，请检查你的网络',
    icon: path.join('../static/lover.png') // 通知图标
  }
  let myNotification = new window.Notification(options.title, options)
  myNotification.onclick = function () {
    console.log('click notification')
  }
});
