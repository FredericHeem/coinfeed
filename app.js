console.log('CoinFeed ')

var config = require('./config.js')();
var coinFeedApp = require('./coinFeedApp.js')(config);

//console.log('NODE_ENV ' + app.settings.env)

//app.use(coinFeedApp);

var port = process.env.PORT || 3000

coinFeedApp.listen(port, function() {
    console.log('listening on http://' + process.env.IP + ':' + port)
});