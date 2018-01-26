var ipc = require('electron').ipcRenderer;

var fileManagerBtn = document.getElementById('btnOpenKeystore');
fileManagerBtn.addEventListener('click', function(event){
    ipc.send('open-file-dialog');
});

//NOTE: You can listen to events in the renderer like this...
ipc.on('selected-file', function (event, path) {
    document.getElementById('selected-file').setAttribute('value', path);
    ipc.send('OpenKeystoreFromPath', path);
});

ipc.on('OpenKeystoreFromPath-error', function(event, err){
    var out = document.getElementById('output');
    out.innerText = err;
    out.setAttribute('style', 'color:red;');
});

ipc.on('OpenKeystoreFromPath-success', function(event, data){
    var out = document.getElementById('output');
    out.innerText = JSON.stringify(data);
    out.setAttribute('style', '');
});