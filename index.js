var yellowPushMS = require('./lib/yellowPushSMS');

yellowPushMS.start("achavez@identidadiot.com", "1d3nt1d@d")
//var response = yellowPushMS.sendSms('Damian','Esto es una prueba desde Node JS', '573163985157');
var response = yellowPushMS.getMessageStatus('5a5600d4-e8fb-6db2-0815-f979883a061c', new Date('2018-03-01'))

 response.then((response) => {
    console.log('respuesta Modulo', response);
}).catch(error => {
    console.log('error fuera', error); 
});  

/* var prueba = require('./lib/prueba');


prueba.pruebaPromise().then(response => {
    console.log('Prueba Exitosa:', response);
}).catch(error => {
    console.log('Prueba Erronea:', error); 
}); */
