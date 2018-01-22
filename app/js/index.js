var ipc = require('electron').ipcRenderer;

var btnCreateKeytore = document.getElementById('btnCreateKeystore');
var btnOpenKeystore = document.getElementById('btnOpenKeystore');
btnCreateKeytore.addEventListener('click', function(event){
    ipc.send('create-keystore-dialog');
});
btnOpenKeystore.addEventListener('click', function(event){
    ipc.send('open-keystore-dialog');
});