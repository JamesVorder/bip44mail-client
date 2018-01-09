var bc = require('../lib/BitterClient');

bc.OpenKeystoreFromPath('keystore', function(err, data){
    if(err) console.log(err);
    else{
        console.log(data);
    }
});