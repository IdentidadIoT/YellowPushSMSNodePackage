var yellowPushMS = require('./lib/yellowPushSMS');
yellowPushMS.start("achavez@identidadiot.com", "1d3nt1d@d");
//yellowPushMS.start("achavez@identidadiot.com", "1d3nt1d@d", "10278");

//sendSMS();
bulkSendSMS();
//GetMeessageStatus();


function sendSMS(){
    var response = yellowPushMS.sendSMS('YellowPushSMS','Prueba SMS Node' , '573163985157,573175564608');
    printResponse(response);
}

function bulkSendSMS(){

    var messages = [
        {   from: 'Prueba',
            to: '573163985157',
            message: 'Prueba bulk node Damian' },
        {   from: 'Prueba',
            to: '573175564608',
            message: 'Prueba bulk node Jose' }
    ];

    var response = yellowPushMS.bulkSendSMS(messages);
    printResponse(response);
}

function GetMeessageStatus(){
    var response = yellowPushMS.getMessageStatus('5a5600d4-4972-dcb7-742c-e6cad2e16606', new Date('2018-03-06'))
    printResponse(response);
}

function printResponse(response){
    response.then((response) => {
        console.log('Respuesta Libreria', response );
        /*var res = response.content;
        var res2 = JSON.parse(res);
        console.log('content', res );
        console.log('message_id', res2.details[0].message_id );*/
    }).catch(error => {
        console.log('Error Libreria', error); 
    });
}
