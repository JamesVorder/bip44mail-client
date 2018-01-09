var bc = require('../BitterClient');

bc.CreateKeystore(bc.generateNew12Words(), "toor", function(err, data){
    if(err){
        console.log('Error: ' + err);
    }
    else{
        bc.ExportKeystoreToPath('keystore', function(err, data){
            if(err) console.log(err);
            else console.log('Success: ' + data);
        });
    }
});