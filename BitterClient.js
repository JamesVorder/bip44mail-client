var lightwallet = require('eth-lightwallet');
var fs = require('fs');

var BitterClient = {};

var keystore = new lightwallet.keystore;

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
        this.keystore = ks;
        callback(undefined, ks);
    });
};

BitterClient.ExportKeystoreToPath = function(path, keystore, callback){
    var filepath = path;
    fs.closeSync(fs.openSync(filepath, 'a'));
    fs.writeFile(filepath, keystore.serialize(), function(err){
        if(err){
            callback(err, undefined);
        }
        callback(undefined, filepath);
    });
};

BitterClient.OpenKeystoreFromPath = function(path, callback){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) callback(err, undefined);
        this.keystore = lightwallet.keystore.deserialize(data);
        callback(undefined, this.keystore);
    });
};

BitterClient.addAddress = function(password, keystore, callback){
    keystore.keyFromPassword(password, function (err, pwDerivedKey) {
        if (err) callback(err, undefined);
        else{
            keystore.generateNewAddress(pwDerivedKey, 1);
            callback(undefined, keystore);
        }
    });
};

module.exports = BitterClient;