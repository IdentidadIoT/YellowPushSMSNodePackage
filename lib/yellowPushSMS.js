//Dependencies
var request = require("request");
var base64 = require('base-64'); 

const URL_API_REST_ACCOUNT = "https://api.identidadsms.net/rest/account";
const URL_API_REST_AUTH = "https://api.identidadsms.net/rest/auth";
const URL_API_REST_SENDSMS = "https://api.identidadsms.net/rest/send_sms";
const URL_API_REST_BULKSENDSMS = "https://api.identidadsms.net/rest/bulk_send_sms";
const URL_API_REST_SMSEDR = "https://api.identidadsms.net/rest/sms_edr";

var username = '';
var password = '';

// Object Response
function ClassResponseModule()
{
    this.content = '',
    this.statusCode = '',
    this.hasError = false,
    this.error = ''
}

/*Module SMS*/
module.exports = {

    /**
     * Initialize credentials.
     * @param user Username registered in the system
     * @param pass Password associated with the user in the system
     */
    start: function(user, pass) {
        this.username = user;
        this.password = pass; 
    },

     /**
     * Function to Send of text message
     * @param sender The name of the sender
     * @param message Text message
     * @param cellphoneNumbers Mobile numbers separated by commas to send the text message(The mobile number must also include the country code)
     */
    sendSMS: function(sender, message, cellphoneNumbers) {

        var sendSMSPromise = new Promise((resolve, reject) => {

            getAccount(this.username, this.password)
                .then(responseAccount => getAuthSend(this.username, this.password, responseAccount))
                .then(responseAuth => sendMessage(responseAuth.auth.token, responseAuth.account[0].id, cellphoneNumbers, sender, message))
                .then(responseSendSms => resolve(responseSendSms))
                .catch(error => reject(error));
        });

        return sendSMSPromise;
    },

    /**
     * Sends bulk SMS.
     * @param listMessages The list messages.
     */
    bulkSendSMS: function(listMessages){

        var bulkSendSMSPromise = new Promise((resolve, reject) => {

            getAccount(this.username, this.password)
                .then(responseAccount => getAuthSend(this.username, this.password, responseAccount))
                .then(responseAuth => bulkSMS(responseAuth.auth.token, responseAuth.account[0].id, listMessages, true))
                .then(responseStatusSms => resolve(responseStatusSms))
                .catch(error => reject(error));
        });

        return bulkSendSMSPromise;

    },

    /**
     * Function to gets message status
     * @param messsageId The messsage identifier.
     * @param sendDate The send date.
     */
    getMessageStatus: function(messsageId, sendDate) {

        var getMessageStatusPromise = new Promise((resolve, reject) => {

            getAuth(this.username, this.password)
                .then(responseAuth => smsEdr(responseAuth.token, messsageId, sendDate))
                .then(responseStatusSms => resolve(responseStatusSms))
                .catch(error => reject(error));
        });

        return getMessageStatusPromise;

    }
};

/*------- Private Functions ------- */

/**
* Function to gets the account
* @param user The username.
* @param pass The password.
*/
function getAccount(user, pass) {
    
    var getAccountPromise = new Promise((resolve, reject) => {

        var credentials = base64.encode(user + ':' + pass);
    
        var options = { method: 'GET',
            rejectUnauthorized: false,   
            url: URL_API_REST_ACCOUNT,
            headers: { 
                Authorization: 'Basic ' + credentials
            } 
        };

        request(options, function (error, response, body) {

            if (error) {
                var res = mapperResponse(error);                
                reject(res);
            } else {

                if(response.statusCode != 200){
                    var res = mapperResponse(body, response, body);
                    reject(res);
                } else {
                    resolve(JSON.parse(body));
                }

            }

        });

    });

    
    return getAccountPromise;
}

/**
* Function to gets the token
* @param user The username.
* @param pass The password.
*/
function getAuth(user, pass) {
    
    var getAuthPromise = new Promise((resolve, reject) => {

        var credentials = base64.encode(user + ':' + pass);
    
        var options = { method: 'GET',
            rejectUnauthorized: false,   
            url: URL_API_REST_AUTH,
            headers: { 
                Authorization: 'Basic ' + credentials
            } 
        };

        request(options, function (error, response, body) {

            if (error) {
                console.log('error: ', error)
                var res = mapperResponse(error);   
                reject(res);
            } else {

                if(response.statusCode != 200){
                    var res = mapperResponse(body, response, body);
                    reject(res);
                } else {
                    resolve(JSON.parse(body));
                }
            }

        });

    });

    
    return getAuthPromise;
}

/**
* Function to gets the token
* @param user The username.
* @param pass The password.
*/
function getAuthSend(user, pass, accountRes) {
    
    var getAuthPromise = new Promise((resolve, reject) => {

        var credentials = base64.encode(user + ':' + pass);
    
        var options = { method: 'GET',
            rejectUnauthorized: false,   
            url: URL_API_REST_AUTH,
            headers: { 
                Authorization: 'Basic ' + credentials
            } 
        };

        request(options, function (error, response, body) {
                        
            if (error) {
                var res = mapperResponse(error);
                reject(res);
            } else {

                if(response.statusCode != 200){
                    var res = mapperResponse(body, response, body);
                    reject(res);
                } else {
                    var response = {
                        account: accountRes,
                        auth: JSON.parse(body)
                    };
    
                    resolve(response);
                }

               
            }
        });

    });

    
    return getAuthPromise;
}

/**
* Function to gets the token
* @param token The token.
* @param accId The acc identifier..
* @param to The cellphone numbers separated by commas to send the text message (The cellphone number must also include the country code)..
* @param sender Sender name.
* @param message The message.
*/
function sendMessage(token, accId, to, sender, message) {

    var getSendMesagePromise = new Promise((resolve, reject) => {
    
        var options = { method: 'POST',
            rejectUnauthorized: false,  
            url: URL_API_REST_SENDSMS,
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Bearer ' +  token
            },
            form: { 
                acc_id: accId,
                to: to,
                from: sender,
                message: message 
            } 
        };

        request(options, function (error, response, body) {
            
            if (error) {
                var res = mapperResponse(error);
                reject(res);
            } else {
                
                if(response.statusCode != 200){
                    var res = mapperResponse(body, response, body);
                    reject(res);
                } else {
                    var res = mapperResponse(error, response, body);
                    resolve(res);
                }
            }

        });

    });

    
    return getSendMesagePromise;
}

/**
* Sends bulk SMS.
* @param token The token.
* @param accId The acc identifier..
* @param listMessages The List messages.
* @param details if set to true show details in response.
*/
function bulkSMS(token, accId, listMessages, details){

    var showDetails = details ? 1 : 0;

    var bulkSMSPromise = new Promise((resolve, reject) => {

        var options = { method: 'POST',
            rejectUnauthorized: false,  
            url: URL_API_REST_BULKSENDSMS,
            qs: { acc_id: accId, show_details: showDetails },
            headers: { 
                'content-type': 'application/json',
                'Accept-Charset': 'utf-8',
                authorization: 'Bearer ' +  token
            },
            body: listMessages,
            json: true 
        };

        request(options, function (error, response, body) {
                        
            if (error) {
                var res = mapperResponse(error);
                reject(res);
            } else {
                
                if(response.statusCode != 200){
                    var res = mapperResponse(body, response, body);
                    reject(res);
                } else {
                    var res = mapperResponse(error, response, JSON.stringify(body));
                    resolve(res);
                }
            }

        });

    });

    return bulkSMSPromise;
}

/**
* Function to gets the information about message status.
* @param token The token.
* @param messsageId The messsage identifier.
* @param sendDate The send date.
*/
function smsEdr(token, messsageId, sendDate) {

    var startDate = addDays(sendDate, -1).toISOString().substr(0, 10);
    var endDate = addDays(sendDate, 1).toISOString().substr(0, 10);

    var getSendMesagePromise = new Promise((resolve, reject) => {
    
        var options = { method: 'GET',
            rejectUnauthorized: false,  
            url: URL_API_REST_SMSEDR,
            qs: { 
                client_message_id: messsageId,
                start_date: startDate,
                end_date: endDate 
            },
            headers: { 
                authorization: 'Bearer ' +  token
            }
        };

        request(options, function (error, response, body) {

            if (error) {
                var res = mapperResponse(error);
                reject(res);
            } else {

                if(response.statusCode != 200){
                    var res = mapperResponse(body, response, body);
                    reject(res);
                } else {
                    var res = mapperResponse(error, response, body);
                    resolve(res);
                }
                
            }

        });

    });
    
    return getSendMesagePromise;
}

/**
* Function to add days to date.
* @param date The date.
* @param days Numbers of days to add.
*/
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
* Function to return object response.
* @param error The date.
* @param response Numbers of days to add.
* @param body Numbers of days to add.
*/
function mapperResponse(error, response, body) {
    var res = new ClassResponseModule();    
    res.statusCode =  response ? response.statusCode : '';    
    res.content = body ? body : '';
    res.hasError = error ? true : false;
    res.error = error;
    return res;
}

