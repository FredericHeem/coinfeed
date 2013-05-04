// Filename: app.js
define(['jquery', 'underscore', 'backbone', 'bootstrap', 'router', 'models/FeedModel' // Require
], function($, _, Backbone, Bootstrap, Router, FeedModel) {
    var initialize = function() {
            Router.initialize({
            });
    }

    return {
        initialize: initialize
    };
});