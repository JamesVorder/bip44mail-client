var lightwallet = require('eth-lightwallet');
var fs = require('fs');

module.exports.generateNew12Words = function () {
    return lightwallet.keystore.generateRandomSeed();
};

module.exports.ExportKeystoreToPath = function (path, keystore, callback) {
    fs.closeSync(fs.openSync(path, 'a'));
    fs.writeFile(path, keystore.serialize(), function (err) {
        if (err) {
            callback(err, undefined);
        }
        callback(undefined, path);
    });
};

module.exports.OpenKeystoreFromPath = function (path, callback) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      callback(err, undefined)
    }
    callback(undefined, lightwallet.keystore.deserialize(data));
  });
};

module.exports.CreateKeystore = function(twelve_words, pass, callback){
  lightwallet.keystore.createVault({
    password: pass,
    seedPhrase: twelve_words,
    hdPathString: "m/44'/60'/0'/0"
  }, function (err, ks) {
    if (err) {
      callback(err, undefined)
    }
    this.keystore = ks;
    callback(undefined, ks);
  });
}