function coinFeedApp(config) {

    var express = require('express'),
        http = require('http'),
        path = require('path');

    var dal = require("./dal.js")
    dal.authenticate(config.store)

    var app = express.createServer();

    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(require('connect-assets')({ src: __dirname + '/assets' }));
    });

    require('./routes/index')(app, config);

    app.param('ticker');

    app.get('/tickers/:ticker', function (req, res) {
        console.log("/tickers/:ticker " + req.params.ticker)
        dal.getLastTicker(req.params.ticker, function (ticker) { res.json(ticker) })
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    function sendError(res) {
        app.emit('error');
        res.send("error", 500);
    }

    return app
}

module.exports = coinFeedApp;