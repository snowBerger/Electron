// clipboard.js

// clipboard可以在主进程或渲染进程使用
const { clipboard, nativeImage } = require('electron')

// 双击复制消息
let msg = document.querySelector('#msg')
let plat = document.querySelector('#plat')
let text = document.querySelector('#text')

msg.ondblclick = function () {
  clipboard.writeText(msg.innerHTML)
  // alert(msg.innerHTML)
}
plat.onclick = function () {
  text.value = clipboard.readText()
}

// 复制本地图片到剪贴板
let copyImg = document.querySelector('#copyImg')
copyImg.onclick = function () {
  // 结合nativeImage模块
  let image = nativeImage.createFromPath(path.join(__dirname, '/static/xiaohuangren.jpeg'))
  // 复制图片
  clipboard.writeImage(image)
  alert('copy success')
}

// 复制图片显示到界面
let pastImg = document.querySelector('#pastImg')
pastImg.onclick = function () {
  // 粘贴图片
  let imgSrc = clipboard.readImage().toDataURL() // base64图片

  // 显示到页面上
  let imgDom = new Image()
  imgDom.src = imgSrc
  document.querySelector('.past-content').appendChild(imgDom)
}

// 清空
let clean = document.querySelector('#clean')
clean.onclick = function () {
  // 清空剪贴板
  clipboard.clear()
  // 清空内容
  document.querySelector('.past-content').textContent = ''
}