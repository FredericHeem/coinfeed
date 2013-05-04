module.exports = function() {
    console.log("config")
    
    var konphyg = require('konphyg')(__dirname + '/config');
    var configAll = konphyg.all();
    var config = configAll.config;
    if(process.env.C9_PORT){    
        config.url = "http://coinfeed.fredericheem.c9.io"
    }
    
    return config;
}