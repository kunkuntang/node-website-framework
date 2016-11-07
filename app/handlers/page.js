var helpers = require('./helpers.js'),
	config = require('./config.js'),
	fs = require('fs');

exports.version = '0.1.0';

exports.generate = function(req, res){
    
    var file = req.params.page_file;
    
	var page = req.params.page_name,
        address = "http://" + config.address.host + ":" + config.address.port;

	fs.readFile('basic.html', function(err, contents){
		if(err) {
			helpers.send_failure(res, helpers.http_code_for_error(err), err);
			return;
		}

		contents = contents.toString('utf8');
		contents = contents.replace(/{{ADDRESS}}/g, address);
        contents = contents.replace(/{{file}}/g, file);
		contents = contents.replace('{{PAGE_NAME_JS}}', page);
		contents = contents.replace('{{PAGE_NAME_CSS}}', page);
		res.writeHead(200, { "Content-Type" : "text/html" });
		res.end(contents);
	})
}