const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let port = 8888; //(process.env.PORT || process.env.VCAP_APP_PORT || 8888);

// Database of students (TODO: replace with SQL database)
let student1 = {id: 1001, firstName: "Stacy", lastName: "Broadley"};
let student2 = {id: 1002, firstName: "Chas",  lastName: "Emerick"};
let student3 = {id: 1002, firstName: "Steve", lastName: "Tonsky"};
let students = [student1, student2, student3];

let docRoot = "./html";

http.createServer(function (request, response) {
	
	console.log("In server request handler code");
	
	if (request.url === "/students") {
		response.writeHead(200, {'Content-Type': 'application/json'}); // HTTP status: 200
		response.end(JSON.stringify(students));
		return;
	}
	
	console.log(`Serving static file ${request.url}`);
	serveStaticFiles(request, response);
	
}).listen(port);

console.log(`Server listening at http://127.0.0.1:${port} (note: open your browser and navigate to this url)`);

//
// Note: This is a helper function to serve static html/js/etc files found
//       in the html sub-folder of this project
//
function serveStaticFiles(request, response) {
	
	console.log(`${request.method} ${request.url}`);
	
	// parse URL
	const parsedUrl = url.parse(request.url);
	// extract URL path
	let pathname = docRoot + `${parsedUrl.pathname}`;
	// console.log("Full path: " + pathname);

	// maps file extension to MIME types
	const mimeType = {
		'.ico' : 'image/x-icon',
		'.html' : 'text/html',
		'.js' : 'text/javascript',
		'.json' : 'application/json',
		'.css' : 'text/css',
		'.png' : 'image/png',
		'.jpg' : 'image/jpeg',
		'.wav' : 'audio/wav',
		'.mp3' : 'audio/mpeg',
		'.svg' : 'image/svg+xml',
		'.pdf' : 'application/pdf',
		'.doc' : 'application/msword',
		'.eot' : 'appliaction/vnd.ms-fontobject',
		'.ttf' : 'aplication/font-sfnt'
	};
	fs.exists(pathname, function(exist) {
		if (!exist) {
			// if the file is not found, return 404
			response.statusCode = 404;
			response.end(`File ${pathname} not found!`);
			return;
		}
		// if is a directory, then look for index.html
		if (fs.statSync(pathname).isDirectory()) {
			pathname += '/index.html';
		}
		// read file from file system
		fs.readFile(pathname, function(err, data) {
			if (err) {
				response.statusCode = 500; // indicates a server error
				response.end(`Error getting the file: ${err}.`);
			} else {
				// based on the URL path, extract the file extension. e.g. .js, .doc, ...
				const ext = path.parse(pathname).ext;
				// if the file is found, set Content-type and send data
				response.setHeader('Content-type', mimeType[ext] || 'text/plain');
				response.end(data);
			}
		});
	});
}
