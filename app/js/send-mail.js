var ipc = require('electron').ipcRenderer;

window.onload = function(){
  ipc.send('GetAddresses');
}

ipc.on('RefreshAddressList', function(event, addresses){
  var list = "";
  for(var addr in addresses) {
    list += "<li class='address_option'>" + addresses[addr] + "</li>";
  }
  document.getElementById("menu").innerHTML = list;
  var addressList = document.querySelectorAll('.address_option');
  for(var i = 0; i < addressList.length; i++) {
    console.log(addressList[i]);
    addressList[i].addEventListener("click", function(){
      document.getElementById("from").value = this.innerText;
    }, false);
  }
});

var showMenu = function(){
  document.getElementById("menu").style.display="block";
}

var hideMenu = function(){
  document.getElementById("menu").style.display="none";
}

var sendMail = function(){
  var to = document.getElementById('to').value;
  var from = document.getElementById('from').value;
  var subject = document.getElementById('subject').value;
  var message = document.getElementById('messageBody').value;
  var password = document.getElementById('password').value;

  ipc.send('SendMessage', to, from, subject, message, password);
}