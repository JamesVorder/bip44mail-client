//***************************
//CONFIGURATION
//***************************


'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var ipc = require('electron').ipcMain;
var dialog = require('electron').dialog;
var Client = require('./lib/client');
var utils = require('./lib/utils');
var fs = require('fs');
var request = require('request');
var pug = require('electron-pug')({pretty: true});

var mainWindow = null;
var cli;

var createWindow = function () {
  mainWindow = new BrowserWindow({
    frame: true,
    resizable: true,
    height: 500,
    width: 500
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.pug');
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});


//<editor-fold desc='Application Code'>
ipc.on('create-keystore-dialog', function (event) {
  mainWindow.loadURL('FILE://' + __dirname + '/app/create-keystore-dialog.pug');
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('generate12Words', utils.generateNew12Words());
  });
});

ipc.on('open-keystore-dialog', function (event) {
  mainWindow.loadURL('FILE://' + __dirname + '/app/open-keystore-dialog.pug');
});

ipc.on('createAddress', function(event, password){
  cli.addAddress(password, function(err, data){
    if(err){
      event.sender.send('createAddress-error', err);
    } else{
      event.sender.send('createAddress-success', data);
    }
  });
})

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }, function (files) {
    if (files) {
      event.sender.send('selected-file', files[0])
    }
  });
});

ipc.on('OpenKeystoreFromPath', function (event, path) {
  utils.OpenKeystoreFromPath(path, function(err, data){
    if (err) {
      event.sender.send('OpenKeystoreFromPath-error', err)
    }
    else {
      cli = new Client(data, path);
      event.sender.send("OpenKeystoreFromPath-success", data);
    }
  });
});

ipc.on('SaveKeystore', function(event, new_path){
  if(cli){
    utils.ExportKeystoreToPath(new_path? new_path : cli.path, cli.keystore, function(err, data){
      if(err){
        event.sender.send("SaveKeystore-error", err);
      }
      else{
        event.sender.send("SaveKeystore-success", data);
      }
    });
  }
});

ipc.on('CreateKeystore', (function (event, pass) {
  utils.CreateKeystore(utils.generateNew12Words(), pass, function (err, data)
  {
    if (err) {
      event.sender.send('CreateKeystore-error', err);
    }
    else {
      dialog.showSaveDialog({
        filters: [
          {name: 'bip44Mail Vault', extensions: ['vault']}
        ]
      }, (function (fileName) {

        if (fileName === undefined) {
          return;
        }

        fs.writeFile(fileName, data.serialize(), (function (err) {
          if(!err){
            cli = new Client(data, fileName);
            event.sender.send('CreateKeystore-success', "Success!");
          }
        }).bind(this));
      }).bind(this));
    }
  });
}).bind(this));

ipc.on('GetAddresses', function(event){
  event.sender.send('RefreshAddressList', cli.getAddresses());
})

ipc.on('SendMessage', function(event, to, from_addr, subject, message, password){
  cli.signMessage(message, password, from_addr, function(err, sig){
    if(err){
      console.log("Error: " + err);
    }
    else{
      cli.SendMail(to, from_addr, subject, message, sig);
    }
  });
});

ipc.on('CreateInbox', function(event, address, password){
  cli.signMessage(address, password, address, function(err, data){
    if(err) {
      console.log("Error: " + err);
    } else{
      cli.registerAddress(data, address);
    }
  })
});
//</editor-fold>