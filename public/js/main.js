// Filename: main.js

require.config({
    paths: {
        jquery: 'vendor/jquery-1.7.1',
        underscore: 'vendor/underscore-min',
        backbone: 'vendor/backbone-min',
        jqueryui: 'vendor/jquery-ui-1.8.11.custom.min',
        bootstrap: 'vendor/bootstrap',
        moment: 'vendor/moment-min'
        
    },
    shim: {
        'jqueryui': {
            deps: ['jquery'],
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['app', ], function(App) {
    App.initialize();
});