var ipc = require('electron').ipcRenderer;

var fileManagerBtn = document.getElementById('btnOpenKeystore');
fileManagerBtn.addEventListener('click', function(event){
    ipc.send('open-file-dialog');
});

ipc.on('selected-file', function (event, path) {
    document.getElementById('selected-file').innerHTML = "You selected: " + path;
});