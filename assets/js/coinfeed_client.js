/*jslint nomen: true, plusplus: true, undef: true, todo: true, white: true,
  browser: true */
/*global Backbone: false, _: false, $: false */


var App = {
    model: {},
    collection: {},
    view: {},
    router: {}
};

App.model.TickerMtGox = Backbone.Model.extend({
    urlRoot: 'https://data.mtgox.com/api/2/BTCUSD/money/ticker',
    defaults: {
        bid:'Fetching',
        ask:'Fetching'
    },
    parse: function(response) {
        console.log("TickerMtGoxModel parse ");
        if (response) {
            console.log("result " + response.result);
            if (response.data) {
                return { 
                  name: "MtGox", 
                  bid: response.data.buy.display,
                  ask: response.data.sell.display};           
            } 
        }
    }   
});

App.model.TickerBtce = Backbone.Model.extend({
    url: 'https://btc-e.com/api/2/',
    //url: 'https://btc-e.com/api/2/btc_usd/ticker',
    defaults: {
        bid:'Fetching',
        ask:'Fetching'
    },
    
    parse: function(response) {
        console.log("TickerBtce parse ");
        if (response) {
            console.log("bid " + response.result.bid);
            
            return { 
              name: "Btc-e", 
              bid: response.ticker.buy,
              ask: response.ticket.sell};           
             
        }
    }   
}); 

App.model.TickerBitstamp = Backbone.Model.extend({
    urlRoot: 'https://www.bitstamp.net/api/ticker/',
    defaults: {
        bid:'Fetching',
        ask:'Fetching'
    },
   
    parse: function(response) {
        console.log("TickerBitstamp parse ");
        if (response) {
            console.log("bid " + response.result.bid);
            
            return { 
              name: "BitStamp", 
              bid: response.bid,
              ask: response.ask};           
             
        }
    }   
});    
/**
 * TickerMtGox view
 */
App.view.TickerMtGox = Backbone.View.extend({

    tagName:"div",
    className:"tickerMtGox",
    
    initialize: function() {
        console.log("TickerMtGoxView init ");
        this.template = _.template($("#tickerTemplate").html()),
        this.model.on('change', this.render, this); 
        this.model.fetch({
          success: function() {
            // fetch successfully completed
            //console.log("fetched !" + this.toJSON());
          },
          error: function() {
              console.log('Failed to fetch!');
          }
        });
        
        $('<img src="img/spinner.gif" class="spinner"/>').appendTo(this.$el);
    },
    render:function () {
            console.log("TickerMtGoxView render ");
            console.log(this.model);
            $(this.el).html(this.template({
              model: this.model.toJSON() 
            }));
            return this;
        }
});

/**
 * Ticker view
 */
App.view.Tickers = Backbone.View.extend({
    events: {
    },

    initialize: function() {
        console.log("Tickers init ");
    },
    
    render: function() {
        console.log("Tickers render ");
        return this;
    }   
});
/**
 * Feed view
 */
App.view.Feed = Backbone.View.extend({
    events: {
    },

    initialize: function() {
    
    var ajaxDataRenderer = function(url, plot, options) {
      console.log("ajaxDataRenderer " + url);
      var ret = null;
      $.ajax({
        // have to use synchronous here, else the function 
        // will return before the data is fetched
        async: false,
        url: url,
        dataType:"json",
        success: function(data) {
        console.log("ajaxDataRenderer success " + data);
        ret = [data];
      }
      });
      return ret;
    };
  
    // The url for our json data
    var jsonurl = "mtgox/btc/usd";
  
  var ohlc = [
  ['06/15/2009 16:00:00', 136.01, 139.5, 134.53, 139.48],
  ['06/08/2009 16:00:00', 143.82, 144.56, 136.04, 136.97],
  ['06/01/2009 16:00:00', 136.47, 146.4, 136, 144.67],
  ['05/26/2009 16:00:00', 124.76, 135.9, 124.55, 135.81],
  ['05/18/2009 16:00:00', 123.73, 129.31, 121.57, 122.5],
  ['05/11/2009 16:00:00', 127.37, 130.96, 119.38, 122.42],
  ['05/04/2009 16:00:00', 128.24, 133.5, 126.26, 129.19],
  ['04/27/2009 16:00:00', 122.9, 127.95, 122.66, 127.24],
  ['04/20/2009 16:00:00', 121.73, 127.2, 118.6, 123.9],
  ['04/13/2009 16:00:00', 120.01, 124.25, 115.76, 123.42],
  ['04/06/2009 16:00:00', 114.94, 120, 113.28, 119.57],
  ['03/30/2009 16:00:00', 104.51, 116.13, 102.61, 115.99],
  ['03/23/2009 16:00:00', 102.71, 109.98, 101.75, 106.85],
  ['03/16/2009 16:00:00', 96.53, 103.48, 94.18, 101.59],
  ['03/09/2009 16:00:00', 84.18, 97.2, 82.57, 95.93],
  ['03/02/2009 16:00:00', 88.12, 92.77, 82.33, 85.3],
  ['02/23/2009 16:00:00', 91.65, 92.92, 86.51, 89.31],
  ['02/17/2009 16:00:00', 96.87, 97.04, 89, 91.2],
  ['02/09/2009 16:00:00', 100, 103, 95.77, 99.16],
  ['02/02/2009 16:00:00', 89.1, 100, 88.9, 99.72],
  ['01/26/2009 16:00:00', 88.86, 95, 88.3, 90.13],
  ['01/20/2009 16:00:00', 81.93, 90, 78.2, 88.36],
  ['01/12/2009 16:00:00', 90.46, 90.99, 80.05, 82.33],
  ['01/05/2009 16:00:00', 93.17, 97.17, 90.04, 90.58],
  ['12/29/2008 16:00:00', 86.52, 91.04, 84.72, 90.75],
  ['12/22/2008 16:00:00', 90.02, 90.03, 84.55, 85.81],
  ['12/15/2008 16:00:00', 95.99, 96.48, 88.02, 90],
  ['12/08/2008 16:00:00', 97.28, 103.6, 92.53, 98.27],
  ['12/01/2008 16:00:00', 91.3, 96.23, 86.5, 94],
  ['11/24/2008 16:00:00', 85.21, 95.25, 84.84, 92.67],
  ['11/17/2008 16:00:00', 88.48, 91.58, 79.14, 82.58],    
  ['11/10/2008 16:00:00', 100.17, 100.4, 86.02, 90.24],
  ['11/03/2008 16:00:00', 105.93, 111.79, 95.72, 98.24],
  ['10/27/2008 16:00:00', 95.07, 112.19, 91.86, 107.59],
  ['10/20/2008 16:00:00', 99.78, 101.25, 90.11, 96.38],
  ['10/13/2008 16:00:00', 104.55, 116.4, 85.89, 97.4],
  ['10/06/2008 16:00:00', 91.96, 101.5, 85, 96.8],
  ['09/29/2008 16:00:00', 119.62, 119.68, 94.65, 97.07],
  ['09/22/2008 16:00:00', 139.94, 140.25, 123, 128.24],
  ['09/15/2008 16:00:00', 142.03, 147.69, 120.68, 140.91]
];

    var plot1 = $.jqplot('marketChart',jsonurl,{
    dataRenderer: ajaxDataRenderer,
    dataRendererOptions: {
      unusedOptionalUrl: "mtgox/btc/usd"
    },
    seriesDefaults:{yaxis:'y2axis'},
    axes: {
      xaxis: {
        renderer:$.jqplot.DateAxisRenderer,
        tickOptions:{formatString:'%b %e'}, 
        
        min: "09-01-2008 16:00",
        max: "06-22-2009 16:00",
        tickInterval: "6 weeks",
      },
      y2axis: {
        tickOptions:{formatString:'$%d'}
      }
    },
    series: [{renderer:$.jqplot.OHLCRenderer,
              rendererOptions:{ candleStick:true }}],
    highlighter: {
      show: true,
      showMarker:false,
      tooltipAxes: 'xy',
      yvalues: 4,
      // You can customize the tooltip format string of the highlighter
      // to include any arbitrary text or html and use format string
      // placeholders (%s here) to represent x and y values.
      formatString:'<table class="jqplot-highlighter"> \
      <tr><td>date:</td><td>%s</td></tr> \
      <tr><td>open:</td><td>%s</td></tr> \
      <tr><td>hi:</td><td>%s</td></tr> \
      <tr><td>low:</td><td>%s</td></tr> \
      <tr><td>close:</td><td>%s</td></tr></table>'
    }
  });        
    },

    render: function() {
       
        return this;
    }   
});

App.router.CoinFeedRouter = Backbone.Router.extend({
    routes: {
        ""      : "tickers",
        "/feed" : "feed"
    },

    initialize: function(options) {
        
        this.tickerMtGoxModel = new App.model.TickerMtGox();
        
        
        this.tickerMtGoxView = new App.view.TickerMtGox({
            model: this.tickerMtGoxModel,
            el: $('#tickerMtGox').get(0),
        }).render();
        
        this.tickerBitstampModel = new App.model.TickerBitstamp();
        /*  
        this.tickerBitStampView = new App.view.TickerMtGox({
            model: this.tickerBitstampModel,
            el: $('#tickerBitStamp').get(0),
        }).render();
          */    
        this.tickerBtceModel = new App.model.TickerBtce();
          
        this.tickerBtceView = new App.view.TickerMtGox({
            model: this.tickerBtceModel,
            el: $('#tickerBtce').get(0),
        }).render();
              
                    
        this.tickers = new App.view.Tickers({
            el: $('#tickers').get(0),
        }).render();
        
        //this.feed = new App.view.Feed({
        //    el: $('#feed').get(0),
        //}).render();
        
    },
    ticker: function() {
        this._showPane('ticker');
    },
    feed: function() {
        this._showPane('feed');
    },

    _showPane: function(pane) {
        $('#switch .active').removeClass('active');
        $('#switch .'+pane).addClass('active');
        $('#'+ pane).show();
        _(['ticker', 'feed']).chain().without(pane).each(function(pane) {
            $('#'+ pane).hide();
        });
        this[pane].trigger('show');
    }
});
(function() {
        $(document).ready(function() {
            new App.router.CoinFeedRouter({});
            Backbone.history.start();
        });
})();

        
