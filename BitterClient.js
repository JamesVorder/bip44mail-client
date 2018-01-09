var lightwallet = require('eth-lightwallet');
var fs = require('fs');

var BitterClient = {};

BitterClient.keystore = new lightwallet.keystore;

BitterClient.generateNew12Words = function(){
    return lightwallet.keystore.generateRandomSeed();
};

BitterClient.CreateKeystore = function(words, password, callback){
    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: words,
        hdPathString: "m/44'/60'/0'/0"
    }, function(err, ks){
        if(err) callback(err, undefined);
        BitterClient.keystore = ks;
        callback(undefined, ks);
    });
};

BitterClient.ExportKeystoreToPath = function(path, callback){
    var filepath = path;
    fs.closeSync(fs.openSync(filepath, 'a'));
    fs.writeFile(filepath, BitterClient.keystore.serialize(), function(err){
        if(err){
            callback(err, undefined);
        }
        callback(undefined, filepath);
    });
};

BitterClient.OpenKeystoreFromPath = function(path, callback){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) callback(err, undefined);
        BitterClient.keystore = lightwallet.keystore.deserialize(data);
        callback(undefined, BitterClient.keystore);
    });
};

BitterClient.addAddress = function(password){
    BitterClient.keystore.keyFromPassword(password, function (err, pwDerivedKey) {
        if (err) throw err;
        return BitterClient.keystore.generateNewAddress(pwDerivedKey, 1);
    });
};

module.exports = BitterClient;