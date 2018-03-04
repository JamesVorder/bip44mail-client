var ipc = require('electron').ipcRenderer;

var sendMail = function(){
  var to = document.getElementById('to').value;
  var from = document.getElementById('from').value;
  var subject = document.getElementById('subject').value;
  var message = document.getElementById('messageBody').value;
  var password = document.getElementById('password').value;

  ipc.send('SendMessage', to, from, subject, message, password);
}