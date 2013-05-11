function coinFeddApp(config) {

    var express = require('express'),
        http = require('http'),
        path = require('path');

    var mongo = require('mongodb');

    var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

    var server = new Server('ds059947.mongolab.com', 59947, { auto_reconnect: true });
    db = new Db('bitcointickers-dev', server, { safe: true });

    db.open(function (err, db) {
        if (db) {
            console.log("authenticating to db");
            db.authenticate("coinfeed", "coinfeed1234", function (err2, data2) {
                if (data2) {
                    console.log("Database opened");
                    var collection = db.collection('Bitstamp-BTC-USD');
                    collection.count(function (err, count) {
                        console.log("count " + count)
                    })

                    collection.find({}, {}, { limit: 1 }, function (err, cursor) {
                        if (err) {
                            console.log("cannot find from db");
                        } else {
                            cursor.each(function (errCursor, item) {
                                if (errCursor) {
                                    console.log("error in cursor each " + errCursor);
                                } else {

                                    console.log("got " + item);
                                    if (item) {
                                        console.log("time  " + item.date);
                                        console.log("bid   " + item.bid);
                                        console.log("ask   " + item.ask);
                                    }
                                }
                            });
                        }
                    });
                }
                else {
                    console.log("db error: " + err2);
                }
            });
        }
        else {
            console.log(err);
        }

    });

   

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


//    app.param('ticker', function (req, res, next, ticker) {
//        console.log("ticker param " + ticker)
//    });

    app.param('ticker');

    app.get('/tickers/:ticker', function (req, res) {
        console.log("get ticker " + req.params.ticker)
        app.emit('/tickers/bitstamp/btc/usd');

        var collection = db.collection(req.params.ticker);

        collection.find({}, {}, { limit: 1 }, function (err, cursor) {
            if (err) {
                console.log("cannot find from db");
            } else {
                cursor.each(function (errCursor, item) {
                    if (errCursor) {
                        console.log("error in cursor each " + errCursor);
                    } else {

                        console.log("got " + item);
                        if (item) {
                            console.log("time  " + item.date);
                            console.log("bid   " + item.bid);
                            console.log("ask   " + item.ask);
                            res.json(item)
                        }
                        
                    }
                });
            }
        });
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

module.exports = coinFeddApp;