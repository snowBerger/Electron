// shell.js

const { shell } = require('electron')
let shellDom = document.querySelector('#shellDom')

shellDom.onclick = function (e) {
  shell.openExternal('https://github.com/snowBerger')
}