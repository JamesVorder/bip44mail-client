'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var ipc = require('electron').ipcMain;
var dialog = require('electron').dialog;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: true,
        resizable: false,
        height: 500,
        width: 500
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});

ipc.on('create-keystore-dialog', function(event){
    mainWindow.loadURL('FILE://' + __dirname + '/app/create-keystore-dialog.html');
});

ipc.on('open-keystore-dialog', function(event){
    mainWindow.loadURL('FILE://' + __dirname + '/app/open-keystore-dialog.html');
});

ipc.on('open-file-dialog', function(event){
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile']
    }, function (files) {
        if (files) event.sender.send('selected-file', files);
    });
});