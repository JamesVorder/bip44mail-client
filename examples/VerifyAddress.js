var bc = require('../lib/BitterClient');
var request = require('request');

var verifyAddress = function(signature, msg, addr){
    request.post(
        'http://localhost:3000/validateAddress',
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
        var password = "toor";
        bc.signMessage(ks, msg, password, ks.getAddresses()[0], function(err, signature){
            if(err) console.log(err);
            else {
                verifyAddress(signature, msg, ks.getAddresses()[0]);
            }
        });
    }
});