// If request is non-XHR, examine the URL, and build a page to match it
// If request is XHR, provide the partial HTML requested, with some JS to update the URL
// All pages served with some client JS to detect if the appcache for the day has been loaded before, and to load it if not.

// Modules
var http = require('http'), fs = require('fs'), $ = require('jquery');
// var jsdom = require('jsdom');

var goodbye_horses = {
  STATIC: './static/',
  
  start_server: function(address, port) {
    // Start server on port
    http.createServer(this.incoming).listen(port, address);
    console.log('Server running at http://127.0.0.1:1337/');
  },
  
  make_manifest: function(version, files) {
    // Make a manifest file, containing 
    var manifest = {
      type: 'text/cache-manifest',
      body: 'CACHE MANIFEST\n# '+version,
    }; 
    
    files.forEach(function(file) {
      manifest.body += '\n'+file
    });
    
    return manifest
  },
  
  get_section: function(section_name, version) {
    // Give the user an HTML5 manifest with this section name and version
  },
  
  does_user_need_section: function() {
    // Return true if the given user has not previously recieved the section
  },
  
  serve_template: function(filename, response) {
    // End response by serving filename
    console.log(response);
    fs.readFile(goodbye_horses.STATIC+filename, function(error, data) {
      if ( error) {
        console.log('Missing template file');
        throw error;
      }
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);      
    })
  }, 
  
  incoming: function (request, response) {
    // Handle incoming requests by building and finishing the response
    if ( request.url === '/') {
      console.log('Incoming request to: '+request.url);
      goodbye_horses.serve_template('index.html', response)
    }
  },

}

goodbye_horses.start_server("127.0.0.1", 1337)

