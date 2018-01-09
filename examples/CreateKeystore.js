var bc = require('../BitterClient');

bc.CreateKeystore(bc.generateNew12Words(), "toor", function(err, data){
    if(err){
        console.log('Error: ' + err);
    }
    else{
        console.log('Success: ' + data);
    }
});