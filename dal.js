var authenticate = function (config) {
    console.log("authenticate to " + config.dbName)
    var mongo = require('mongodb');

    var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

    var server = new Server(config.hostname, config.port, { auto_reconnect: true });
    db = new Db(config.dbName, server, { safe: true });

    db.open(function (err, db) {
        if (db) {
            console.log("authenticating to db");
            db.authenticate(config.username, config.password, function (err2, data2) {
                if (data2) {
                    console.log("Database opened");
                    var collection = db.collection('Bitstamp-BTC-USD');
                    collection.count(function (err, count) {
                        console.log("count " + count)
                    })
                }
                else {
                    console.error("db error: " + err2);
                }
            });
        }
        else {
            console.log(err);
        }

    });

};

var getLastTicker = function(marketName, callback) {
    console.log("getLastTicker: " + marketName)
    var collection = db.collection(marketName);

    var cursor = collection.find();
    cursor.sort({ _id: -1 }).limit(1)
    cursor.nextObject(function (err, doc) {
        if (err) {
            console.error("cannot find " + marketName + " last ticker from db");
        } else if(doc == undefined){
            console.error("null document from db");
        } else {
            console.log("time  " + doc.date, ", bid " + doc.bid);
            callback(doc)
        }
    });
};

exports.authenticate = authenticate;
exports.getLastTicker = getLastTicker;