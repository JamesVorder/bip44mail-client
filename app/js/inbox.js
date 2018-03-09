var ipc = require('electron').ipcRenderer;

var refreshInbox = function(){
  console.log("refreshInbox called.");
  var password = document.getElementById('txtPassword').value;
  ipc.send('GetMail', password);
}

ipc.on('GotMail', function(event, response_body){
  var messages = new Array();
  messages.push(response_body);
  populateInbox(messages);
});

var populateInbox = function(messages){
  document.getElementById('messages').innerHTML = '';
  for(var i in messages){
    var node = document.createElement('li');
    var text = document.createTextNode(messages[i]);
    node.appendChild(text);
    document.getElementById('messages').appendChild(node);
  }
}