var bc = require('../lib/BitterClient');

bc.OpenKeystoreFromPath('/Users/jamesvorderbruggen/Documents/Source/bip44mail-client/examples/keystore', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data);
  }
});