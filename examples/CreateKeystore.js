var bc = require('../lib/BitterClient');

bc.CreateKeystore(bc.generateNew12Words(), "toor", function (err, ks) {
  if (err) {
    console.log('Error: ' + err);
  } else {
    bc.ExportKeystoreToPath('keystore', ks, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Success: ' + data)
      }
    });
  }
});