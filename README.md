## Introduction
[Coinfeed](http://coinfeed.herokuapp.com/) displays Bitcoin market data from various exchanges such as MtGox, Bitstamp, Bitfinex and Justcoin.
**coinfeed** is designed to be viewed on a mobile device.

### Dependencies
The server is written in nodejs, the client side is Backbone based.
This repository contains the frontend part,
 [coinfeed-backend](https://github.com/FredericHeem/coinfeed-backend) reads market data from exchanges to a mongodb databases,
  **coinfeed** reads these data from the db and serves them to users.

### Get source and build it

    git clone git@github.com:FredericHeem/coinfeed.git
    cd coinfeed
    sudo npm install 
    node app.js

## Contributors

[FredericHeem](https://github.com/FredericHeem)