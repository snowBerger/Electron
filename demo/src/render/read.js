// readFile.js

let fs = require('fs');
let btnRead = document.querySelector('#read');
let content = document.querySelector('#content');

btnRead.onclick = () => {
  fs.readFile('package.json', 'utf8', function (err, data) {
    content.textContent = data;
  });
}