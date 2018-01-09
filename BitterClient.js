var lightwallet = require('eth-lightwallet');
var fs = require('fs');

var BitterClient = {};

BitterClient.generateNew12Words = function(){
    return lightwallet.keystore.generateRandomSeed();
};

BitterClient.CreateKeystore = function(words, password, callback){
    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: words,
        hdPathString: "m/44'/60'/0'/0"
    }, function(err, ks){
        if(err) console.log(err);
        // Some methods will require providing the `pwDerivedKey`,
        // Allowing you to only decrypt private keys on an as-needed basis.
        // You can generate that value with this convenient method:
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
            if (err) throw err;

            // generate five new address/private key pairs
            // the corresponding private keys are also encrypted
            ks.generateNewAddress(pwDerivedKey, 2);
            var filepath = './keystore';
            fs.closeSync(fs.openSync(filepath, 'a'));
            fs.writeFile(filepath, ks.serialize(), function(err){
                if(err){
                    callback(err, undefined);
                }
                callback(undefined, filepath);
            });
        });
    });
};

module.exports = BitterClient;