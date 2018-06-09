var fs = require('fs');
var formidable = require('formidable');

var img;
var imgName;



exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		img = files.upload.path
		imgName = files.upload.name
		console.log(files.upload.name)
		console.log(files.upload.name)
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/" + imgName + "'/>");
		response.end();
	});
	form.uploadDir = './upload'
	form.keepExtensions = true;
	form.on('end', function(){
		console.log(imgName)
	})
}

exports.welcome = function(request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/start.html', function(err, html){
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.write(html);
		response.end();
	})
	
}

exports.error = function(request, response) {
	console.log("Nie wiem co robić.");
	response.write("404 :(");
	response.end();
}

exports.show = function(request, response) {
	fs.readFile(img, "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
}


exports.imgName = imgName