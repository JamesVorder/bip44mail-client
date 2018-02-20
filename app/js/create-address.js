var ipc = require('electron').ipcRenderer;
var fs = require('fs');

var password;

window.onload = function(){
  ipc.send('GetAddresses');
}

var submit = document.getElementById('submit');
var output = document.getElementById('output');
submit.addEventListener('click', function(event){
  password = document.getElementById('password').value;
  ipc.send('createAddress', password);
});

ipc.on('createAddress-success', function(event, data){
  refreshAddressList(data);
  ipc.send('SaveKeystore');
  ipc.send('CreateInbox', data[data.length - 1], password);
});

ipc.on('createAddress-error', function(event, err){
  output.innerText = err;
  output.setAttribute('style', 'color:red;');
});

ipc.on('RefreshAddressList', function(event, addresses){
  refreshAddressList(addresses);
});

var refreshAddressList = function(addresses){
  document.getElementById('addresses').innerHTML = '';
  for(var i in addresses){
    var node = document.createElement('li');
    var text = document.createTextNode(addresses[i]);
    node.appendChild(text);
    document.getElementById('addresses').appendChild(node);
  }
}