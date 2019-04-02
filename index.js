const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

var ZaloOA = require('zalo-sdk').ZaloOA;

var zaConfig = {
	oaid: '1429058342279637002',
	secretkey: 'OJV1E1zTVx11H1R8JOLd'
}
var ZOAClient = new ZaloOA(zaConfig);
app.set('port',(process.env.PORT||8300));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook/',function(req,res){ 
	console.log(JSON.stringify(req.query));
	console.log(JSON.stringify(req.body));
	console.log("Query Post: "+req.query);
});

app.get('/webhook/',(req,res)=>{
	console.log(JSON.stringify(req.query));
    console.log("Query: "+req.query);
	replyMessageServer('7469704234848807541',"Query: "+req.query.event);
	
	//var userId = '84964900534';
		//ZOAClient.api('getprofile', { uid: userId }, function(response) {
		//console.log(response);
	//});
	
    switch(req.query.event){
        case 'sendmsg':
        let message = req.query.message;
        switch(message){
            case 'hello':
            replyMessage(req.query.fromuid);
            break;
        }
		case 'follow':
			replyMessage(req.query.fromuid);
			break;

    }
    res.sendStatus(200);
});
function replyMessage(userId){ 
    ZOAClient.api('sendmessage/text', 'POST', {uid: userId, message: 'APICODE'}, function(response) {
	console.log("Query 2: "+response);
	console.log(JSON.stringify(response));
    })
}
function replyMessageServer(userId,message){ 
    ZOAClient.api('sendmessage/text', 'POST', {uid: userId, message: message}, function(response) {
	console.log("Query 2: "+response);
	console.log(JSON.stringify(response));
    })
}
app.listen(app.get('port'),()=>{
    console.log("running: "+ app.get('port'));
})
