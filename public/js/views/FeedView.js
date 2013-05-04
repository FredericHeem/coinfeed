define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

    var FeedView = Backbone.View.extend({
        events: {
            "click": "click"
        },

        tagName: 'li',

        initialize: function() {
        },

        click: function(e) {
            e.stopPropagation();

        },

        render: function() {
            var label = this.make('label');
            this.$el.append(label);
            return this;
        }
    });

    return FeedView
});
