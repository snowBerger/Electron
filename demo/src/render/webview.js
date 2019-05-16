// webview.js

let myWebview = document.querySelector('#myWebview')

ipcRenderer.on('openwebview', (e, url) => {
  myWebview.src = url
})
