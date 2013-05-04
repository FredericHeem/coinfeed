function coinFeddApp(config) {

    var express = require('express'),
        http = require('http'),
        path = require('path');

    var app = express.createServer();
        
    app.configure(function() {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(require('connect-assets')({src: __dirname +'/assets'}));
    });

    require('./routes/index')(app, config);
    
    app.configure('development', function() {
        app.use(express.errorHandler());
    });

    app.param('uuid', function(req, res, next, uuid) {
    });
    
    
    function sendError(res) {
        app.emit('error');
        res.send("error", 500);
    }
    
    app.get('/calendar/:uuid/board/:board/:name.ics', function(req, res) {
        function error(e) {
            sendError(res);
        }

        app.emit('calendar');
    });

    return app
}

module.exports = coinFeddApp;