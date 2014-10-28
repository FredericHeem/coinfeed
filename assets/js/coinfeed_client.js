/*jslint nomen: true, plusplus: true, undef: true, todo: true, white: true,
browser: true */
/*global Backbone: false, _: false, $: false */

var App = {
    model: {},
    collection: {},
    view: {},
    router: {}
};

/*
* Ticker model
*/
App.model.Ticker = Backbone.Model.extend({
    url: function () {
        return '/tickers/' + this.get("marketName") + '-' + this.get("currencyPair");
    },
    defaults: {
        displayName: "",
        marketName: "",
        icon:"",
        currencyPair: 'BTC-USD',
        symbol: "$",
        bid: '',
        ask: ''
    },
    parse: function (response) {
        //console.log("TickerMtGoxModel parse bid " + response.bid);
        response.bid = accounting.toFixed(response.bid, 2)
        response.ask = accounting.toFixed(response.ask, 2)
        return response
    }
});

/*
* Ticker collection
*/
App.collection.Ticker = Backbone.Collection.extend({
    model: App.model.Ticker
});

/**
* Ticker view
*/
App.view.Ticker = Backbone.View.extend({
    tagName: 'tr',
    events: {
    },

    initialize: function () {
        console.log("TickerView init ");
        this.template = _.template($("#tickerTemplate").html()),
        this.model.on('change', this.render, this);
        this.model.fetch({
            success: function () {
                console.log("fetched");
            },
            error: function () {
                console.error('Failed to fetch!');
            }
        });

        $('<img src="img/spinner.gif" class="spinner"/>').appendTo(this.$el);
    },

    render: function () {
        console.log("Tickers render ");
        $(this.el).empty()
        var model = this.model.toJSON()
        if (model.icon != "") {
            $(this.el).append("<td><img src='img/" + model.icon + "' width='64' height='32'></td>")
        } else {
            $(this.el).append("<td><span class='marketName'>" + model.displayName + "</span></td>")
        }

        if (model.bid == "") {
            $(this.el).append("<td><img src='img/spinner.gif' class='spinner'/></td>")
        } else {
             $(this.el).append("<td class='number'>" + model.symbol + " " + model.bid + "</td>")
        }

         if (model.ask == "") {
             $(this.el).append("<td><img src='img/spinner.gif' class='spinner'/></td>")
         } else {
             $(this.el).append("<td class='number'>" + model.symbol + " " + model.ask + "</td>")
         }
        return this;
    }
});

App.view.TickerTable = Backbone.View.extend({
    tagName: 'table',

    initialize: function () {
        console.log("Table init")
        _.bindAll(this, 'render', 'renderOne');
    },
    render: function () {
        console.log("Table render")
        var table = $("#TickerTable tbody");
        table.empty();
        this.collection.each(this.renderOne);
        return this;
    },
    renderOne: function (model) {
        console.log("Table renderOne")
        var tickerView = new App.view.Ticker({ model: model });
        this.$el.append(tickerView.render().$el);
        return this;
    }
});

/**
* Feed view
*/
App.view.Feed = Backbone.View.extend({
    events: {
    },

    initialize: function () {

        var ajaxDataRenderer = function (url, plot, options) {
            console.log("ajaxDataRenderer " + url);
            var ret = null;
            $.ajax({
                // have to use synchronous here, else the function 
                // will return before the data is fetched
                async: false,
                url: url,
                dataType: "json",
                success: function (data) {
                    console.log("ajaxDataRenderer success " + data);
                    ret = [data];
                }
            });
            return ret;
        };

    },

    render: function () {

        return this;
    }
});

App.router.CoinFeedRouter = Backbone.Router.extend({
    routes: {
        "": "tickers",
        "/feed": "feed"
    },

    initialize: function (options) {

        this.tickerAirbexModel = new App.model.Ticker({ marketName: "Airbex", displayName: "Airbex", icon: "Airbex.png" });
        this.tickerBitstampModel = new App.model.Ticker({ marketName: "Bitstamp", displayName: "Bitstamp", icon:"Bitstamp.png" });
        this.tickerBtceModel = new App.model.Ticker({ marketName: "Btce", displayName: "Btce", icon: "Btce.png" });
        this.tickerBitfinexModel = new App.model.Ticker({ marketName: "Bitfinex", displayName: "Bitfinex", icon: "Bitfinex.jpg" });
        

        this.tickerCollection = new App.collection.Ticker(
                [
                 this.tickerAirbexModel,
                 this.tickerBitstampModel, 
                 this.tickerBtceModel, 
                 this.tickerBitfinexModel
                 ])

        this.ticketTableView = new App.view.TickerTable({ collection: this.tickerCollection, el: $("#TickerTable") });
        this.ticketTableView.render()
    },
    ticker: function () {
        this._showPane('ticker');
    },
    feed: function () {
        this._showPane('feed');
    },

    _showPane: function (pane) {
        $('#switch .active').removeClass('active');
        $('#switch .' + pane).addClass('active');
        $('#' + pane).show();
        _(['ticker', 'feed']).chain().without(pane).each(function (pane) {
            $('#' + pane).hide();
        });
        this[pane].trigger('show');
    }
});
(function () {
    $(document).ready(function () {
        new App.router.CoinFeedRouter({});
        Backbone.history.start();
    });
})();

        
