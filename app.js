console.log('CoinFeed ')

var config = require('./config.js')();
var coinFeedApp = require('./coinFeedApp.js')(config);

var port = process.env.PORT || 3000
var ip = process.env.IP || "localhost"

coinFeedApp.listen(port, function() {
    console.log('listening on http://' + ip + ':' + port)
});