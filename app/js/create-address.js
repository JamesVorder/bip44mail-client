var ipc = require('electron').ipcRenderer;
var fs = require('fs');

window.onload = function(){
  ipc.send('GetAddresses');
}

var submit = document.getElementById('submit');
var output = document.getElementById('output');
submit.addEventListener('click', function(event){
  var password = document.getElementById('password').value;
  ipc.send('createAddress', password);
});

ipc.on('createAddress-success', function(event, data){
  //output.innerText = data;
  //output.setAttribute('style', 'color:green;');
  refreshAddressList(data);
  ipc.send('SaveKeystore');
});

ipc.on('createAddress-error', function(event, err){
  output.innerText = err;
  output.setAttribute('style', 'color:red;');
});

ipc.on('RefreshAddressList', function(event, addresses){
  refreshAddressList(addresses);
});

var refreshAddressList = function(addresses){
  for(var i in addresses){
    // var node = document.createElement("LI");                 // Create a <li> node
    // var textnode = document.createTextNode("Water");         // Create a text node
    // node.appendChild(textnode);
    var node = document.createElement('li');
    var text = document.createTextNode(addresses[i]);
    node.appendChild(text);
    document.getElementById('addresses').appendChild(node);
  }
}