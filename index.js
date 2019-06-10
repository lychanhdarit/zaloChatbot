const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const app = express();

var ZaloOA = require('zalo-sdk').ZaloOA;

var zaConfig = {
	oaid: '1429058342279637002',//'167626828811842335',//
	secretkey: 'OJV1E1zTVx11H1R8JOLd'//'PeI1GE6DVgPm3bN64hU5'//
}
var ZOAClient = new ZaloOA(zaConfig);
app.set('port',(process.env.PORT||8300));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/',function(req,res){ 
    res.sendStatus(200);
});

app.get('/',(req,res)=>{
	console.log(req.query.event);
	//var userId = '84964900534';
		//ZOAClient.api('getprofile', { uid: userId }, function(response) {
		//console.log(response);
	//});

	//replyMessageServer('7469704234848807541',"Query: "+req.query.event);
    switch(req.query.event){
        case 'sendmsg':
			let message = req.query.message;
			switch(message){
				case 'hello':
				replyMessage(req.query.fromuid);
				break;
			}
			break;
		case 'follow':
			replyMessageFollower(req.query.fromuid);
			break;
    }
    res.sendStatus(200);
});
function saveDataFollow(userId){
	ZOAClient.api('getprofile', { uid: userId }, function(response) {
		var dataRespone = response.data;
		var data = {userGender:dataRespone.userGender+'',userId:dataRespone.userId+'',displayName:dataRespone.displayName,avatar:dataRespone.avatar,birthDay:dataRespone.birthDate+''};
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://zalo.vinasave.com/api/customerInsert', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
			console.log("insert success!");
		};
		xhr.addEventListener("error", (err)=>{
			console.log("err: "+err);
		});
        xhr.send(JSON.stringify(data));
		//console.log(response);
		console.log('--------------------------------------------------');
		console.log(dataRespone);
		console.log(data);
	});


}
function replyMessage(userId){ 
    ZOAClient.api('sendmessage/text', 'POST', {uid: userId, message: 'VINASAVE xin chào quý khách.'}, function(response) {
	console.log("Send message: "+response);
	console.log(JSON.stringify(response));
    })
}
function replyMessageFollower(userId){ 
    ZOAClient.api('sendmessage/text', 'POST', {uid: userId, message: 'Xin chúc mừng quý khách đã nhận được mã giảm giá 10% dành riêng cho khách hàng quan tâm VINASAVE trên Zalo trong tháng 6/2019.\n\nMã giảm giá của bạn: ZaloVNS\n\nÁp dụng đến hết 30/6/2019. Nhập mã khi mua hàng online tại website: http://bit.ly/2VaZvEQ'}, function(response) {
		console.log("Send message: "+response); 
	}); 
	saveDataFollow(userId);
}
function replyMessageServer(userId,message){ 
    ZOAClient.api('sendmessage/text', 'POST', {uid: userId, message: message}, function(response) {
		console.log("Send message: "+response); 
    })
}
app.listen(app.get('port'),()=>{
    console.log("running: "+ app.get('port'));
})
