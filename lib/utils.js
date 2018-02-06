var lightwallet = require('eth-lightwallet');

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