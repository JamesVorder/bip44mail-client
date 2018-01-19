var bc = require('../lib/BitterClient');
var request = require('request');
var utils = require('ethereumjs-util');

var verifyAddress = function(signature, msg, addr){
    request.post(
        'http://localhost:3000/validate',
        { json: {
                signature: JSON.stringify(signature),
                msg: msg,
                address: addr
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("INPUT: " + addr)
                console.log('BODY: ' + body);
            }
        });
};

bc.OpenKeystoreFromPath('./keystore', function(err, ks){
    if(err) console.log(err);
    else{
        var msg = "hello world";
        bc.signMessage(ks, msg, "toor", ks.getAddresses()[0], function(err, signature){
            if(err) console.log(err);
            else {
                verifyAddress(signature, msg, ks.getAddresses()[0]);
            }
        });
    }
});