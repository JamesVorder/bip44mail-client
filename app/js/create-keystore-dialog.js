var ipc = require('electron').ipcRenderer;
var fs = require('fs');

var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(event){
    var pass = document.getElementById('txtPassword').value;
    ipc.send('CreateKeystore', pass);
});

ipc.on('generate12Words', function(event, words){
    document.getElementById('seedWords').value = words;
});

ipc.on('CreateKeystore-error', function(event, err){
    var out = document.getElementById('output');
    out.innerText = err;
    out.setAttribute('style', 'color:red;');
});

ipc.on('CreateKeystore-success', function(event, data){
    var out = document.getElementById('output');
    out.innerText = JSON.stringify(data);
    out.setAttribute('style', '');
});