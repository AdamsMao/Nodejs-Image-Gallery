var fs = require('fs');
var path = require('path');
var file_read = require('./list_files');
var domain = require('domain');

module.exports = function (app) {
		app.get('/', function(req, res, next) {
				res.render('index');
		});

		app.get('/upload', function(req, res, next) {
				res.render('upload');
		});

		app.post('/file-upload', function(req, res, next) {
			var d = domain.create();
			d.on('error', console.error);
			d.run(function() {
				var file_name = req.body.file_name + ".jpeg";
				var target_path = path.join('public', 'upload', file_name);
				var bitmap = new Buffer(req.body.imgData, 'base64');
    				// write buffer to file
 				//fs.writeFileSync(target_path, bitmap);
				fs.writeFile(target_path, bitmap);
				//specific the upload to path
				//var source = fs.createReadStream(tmp_path);
			 	//var dest = fs.createWriteStream(target_path)
				//source.pipe(dest);
				res.send('Image uploaded to: ' + target_path);
			});
		});

		app.get('/image', function(req, res) {
			   fs.readFile('./logo.png', function(err, data) {
						if (err) throw err;
						//res.writeHead(200, {'Content-Type' : 'image/png' });
						//res.write(data, 'binary');
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write('<html><body>Image Server<br><img src="data:image/jpeg;base64,')
						res.write(new Buffer(data).toString('base64'));
						res.write('"/>');
						res.write('<br><p>New line</p></body></html>');
				});
		});

		app.get('/download_page', function(req, res, next) {
				res.render('download');
		});

		app.get( '/get_files', file_read.get_lists );
		
		app.get('/download/*', function (req, res, next) {
				target_file = path.join(__dirname, 'public', 'upload', req.params[0]);
				var f = target_file;
				f = path.resolve(f);
				res.download(f);
		});

}


