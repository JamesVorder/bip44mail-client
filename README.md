# bip44mail-client
A simple wallet client that can be integrated with online services to securely create siloed inboxes.

## Running the project
`npm install` to grab the dependencies.

`npm start` to launch the Electron app

## About the stack
I'm using [Electon.js](https://electronjs.org/) to load views created with the [Pug.js](https://pugjs.org/api/getting-started.html) templating language. The client ties into a [bip44mail-server](https://github.com/bip44Mail/bip44mail-server), which can be spun up by anyone with a Mailgun account.
