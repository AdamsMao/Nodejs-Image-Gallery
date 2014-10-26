var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var routes = require('./routes');

var app = express();

//��������
app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// ����ģʽ
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.use(express.bodyParser({uploadDir:'./uploads'}));	//�����ϴ��ļ�

//routes
routes(app);

var server = http.createServer(app).listen(8081);

console.log('serve listening in 8081');

