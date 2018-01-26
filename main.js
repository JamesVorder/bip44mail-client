//***************************
//CONFIGURATION
//***************************


'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var ipc = require('electron').ipcMain;
var dialog = require('electron').dialog;
var bc = require('./lib/BitterClient');
var fs = require('fs');

var mainWindow = null;

var createWindow = function(){
    mainWindow = new BrowserWindow({
        frame: true,
        resizable: true,
        height: 800,
        width: 1000
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function(){
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function(){
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});


//<editor-fold desc='Application Code'>
ipc.on('create-keystore-dialog', function(event){
    mainWindow.loadURL('FILE://' + __dirname + '/app/create-keystore-dialog.html');
    mainWindow.webContents.on('did-finish-load', function(){
        mainWindow.webContents.send('generate12Words', bc.generateNew12Words());
    });
});

ipc.on('open-keystore-dialog', function(event){
    mainWindow.loadURL('FILE://' + __dirname + '/app/open-keystore-dialog.html');
});

ipc.on('open-file-dialog', function(event){
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile']
    }, function (files) {
        if (files) event.sender.send('selected-file', files[0]);
    });
});

ipc.on('OpenKeystoreFromPath', function(event, path){
    bc.OpenKeystoreFromPath(path, function(err, data){
       if(err) event.sender.send('OpenKeystoreFromPath-error', err);
       else event.sender.send("OpenKeystoreFromPath-success", data);
    });
});

ipc.on('CreateKeystore', function(event, pass){
    bc.CreateKeystore(bc.generateNew12Words(), pass, function(err, data){
        if(err) {
            event.sender.send('CreateKeystore-error', err);
        }
        else {
            dialog.showSaveDialog({ filters: [
                    { name: 'bip44Mail-Vault', extensions: ['vault'] }
                ]}, function (fileName) {

                if (fileName === undefined) return;

                fs.writeFile(fileName, data.serialize(), function (err) {

                });

            });
        }
        event.sender.send('CreateKeystore-success', data);
    });
});
//</editor-fold>