var ipc = require('electron').ipcRenderer;
var fs = require('fs');

var submit = document.getElementById('submit');
var output = document.getElementById('output');
submit.addEventListener('click', function(event){
  var password = document.getElementById('password').value;
  ipc.send('createAddress', password);
});

ipc.on('createAddress-success', function(event, data){
  output.innerText = data;
  output.setAttribute('style', 'color:green;');
  ipc.send('SaveKeystore');
});

ipc.on('createAddress-error', function(event, err){
  output.innerText = err;
  output.setAttribute('style', 'color:red;');
});