![YellowPush](https://www.identidadsms.net/yellowpush/wp-content/uploads/2018/02/logo-Yellow-Push.png)

# YellowPush SMS API - Node.js

## Installation

The easiest way to install the library is using [npm](http://www.pip-installer.org/en/latest/), a manager package for JavaScript. Simply run this in the terminal:

    npm install yellowpushsms

### YellowPushSMS Reference

YellowPush API needs your YellowPush credentials. You can either pass these directly to the start method (see the code below).

```javascript

var yellowPushMS = require('yellowpushsms');
yellowPushMS.start('username', 'password');

```

**NOTE:** For better performance you can pass credentials and the account Identifier directly to the start method (see the code below)

```javascript

var yellowPushMS = require('yellowPushSMS');
yellowPushMS.start('username', 'password', 'accountId');

```

### YellowPushSMS parameters:	

- username: Your account user
- password: Your account password 
- accountId: Your account identifier (optional)

### Send an SMS

```javascript

var yellowPushMS = require('yellowPushSMS');
yellowPushMS.start('username', 'password', 'accountId');

var response = yellowPushMS.sendSMS('from', 'message', 'mobileNumberOne,mobileNumberTwo');

response.then((response) => {
    console.log(response);
}).catch(error => {
    console.log(error); 
});

```

### Send Bulk SMS

```javascript

var yellowPushMS = require('yellowPushSMS');
yellowPushMS.start('username', 'password', 'accountId');

var messages = [
    {   from: 'from',
        to: 'mobileNumberOne',
        message: 'message one' },
    {   from: 'from',
        to: 'mobileNumberTwo',
        message: 'message two' }
];

var response = yellowPushMS.bulkSendSMS(messages);

response.then((response) => {
    console.log(response);
}).catch(error => {
    console.log(error); 
});

```

### Gets message status

```javascript

var yellowPushMS = require('yellowPushSMS');
yellowPushMS.start('username', 'password', 'accountId');

 var response = yellowPushMS.getMessageStatus('messsageId', new Date('2018-03-06'))

response.then((response) => {
    console.log(response);
}).catch(error => {
    console.log(error); 
});

```