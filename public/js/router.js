// Filename: router.js
define(['jquery', 'underscore', 'backbone', //
'views/FeedView' //
], function($, _, Backbone, FeedView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "feed"
        },
        
        feed: function() {
            this._showPane('feed');
        },

        _showPane: function(pane) {
            $('#switch .active').removeClass('active');
            $('#switch .' + pane).addClass('active');
            $('#' + pane).show();
            _(['calendar', 'feed', 'boardsReport']).chain().without(pane).each(function(pane) {
                $('#' + pane).hide();
            });
        }
    });

    var initialize = function(options) {

        var appRouter = new AppRouter();

        this.feed = new FeedView({
            el: $('#feed').get(0),
            //collection: this.boards,
            //currentUser: this.currentUser
        }).render();

        appRouter.on('feed', function(actions) {
            console.log('feed', actions);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});