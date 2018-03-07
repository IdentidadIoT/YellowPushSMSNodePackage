## Installation

The easiest way to install the library is using npm, a manager package for JavaScript. Simply run this in the terminal:

    npm install YellowPushSMS

YellowPush API needs your YellowPush credentials. You can either pass these directly to the start method (see the code below).

### Send an SMS

```javascript

var yellowPushMS = require('yellowPushSMS');
yellowPushMS.start("username", "password");

var response = yellowPushMS.sendSMS('from', 'message', '"mobileNumberOne,mobileNumberTwo"');

response.then((response) => {
    console.log(response);
}).catch(error => {
    console.log(error); 
});

```

### Send Bulk SMS

```javascript

var yellowPushMS = require('yellowPushSMS');
yellowPushMS.start("username", "password");

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
yellowPushMS.start("username", "password");

 var response = yellowPushMS.getMessageStatus('messsageId', new Date('2018-03-06'))

response.then((response) => {
    console.log(response);
}).catch(error => {
    console.log(error); 
});

```