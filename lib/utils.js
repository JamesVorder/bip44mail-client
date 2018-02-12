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