var bc = require('../lib/BitterClient');

bc.OpenKeystoreFromPath('./keystore', function (err, ks) {
  if (err) {
    console.log(err)
  } else {
    bc.addAddress("toor", ks, function (err, newKeyStore) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        console.log('Success: ' + newKeyStore.getAddresses());
        bc.ExportKeystoreToPath('keystore', newKeyStore, function (err, data) {
            if (err) {
              console.log('Error: ' + err)
            } else {
              console.log('Success: ' + data)
            }
          }
        );
      }
    });
  }
});