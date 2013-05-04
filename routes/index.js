/*
 * GET home page.
 */
module.exports = function(app, config) {

    app.get('/', function(req, res) {
        console.log("index " + config)
        res.render('index_logged', {
                logged: true,
                //uuid: req.session.uuid,
                config: config
        });
    });
}