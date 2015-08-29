var express = require('express'),
    parser = require('xml2json'),
    request = require('request'),
    _ = require('underscore'),
    config = require('../config/config.js');

module.exports = (function() {
    var app = express.Router();

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/plex/img*', function(req, res){
         request.get('http://' + config.plex.url + ':' + config.plex.port + req.query.url + '?X-Plex-Token=' + config.plex.token).pipe(res);
    });

    app.get('/assets/php/now_playing_title_ajax.php', function(req, res){
        request('http://' + config.plex.url + ':' + config.plex.port + '/status/sessions?X-Plex-Token=' + config.plex.token, function (error, response, body) {
            // See if Plex Media Server is online and how many people are watching.
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(parser.toJson(body))['MediaContainer'];
            		if(json['size'] == 0){
                        title = 'Recently Released';
                    } else {
                        title = 'Now Playing';
                    }
            } else {
                title = 'Recently Viewed';
            }
            res.send('<h1 class="exoextralight">' + title + '</h1><hr>');
        })
    });

    app.get('/assets/php/now_playing_ajax.php', function(req, res){
        request('http://' + config.plex.url + ':' + config.plex.port + '/status/sessions?X-Plex-Token=' + config.plex.token, function (error, response, body) {
            // See if Plex Media Server is online and how many people are watching.
            if (!error && response.statusCode == 200) {
                var sessions = JSON.parse(parser.toJson(body))['MediaContainer'];
                if(sessions['size'] == 0){
                    request('http://' + config.plex.url + ':' + config.plex.port + '/library/sections?X-Plex-Token=' + config.plex.token, function (error, response, body) {
                        // See if Plex Media Server is online and how many people are watching.
                        if (!error && response.statusCode == 200) {
                            var libraries = JSON.parse(parser.toJson(body))['MediaContainer'];
                            var libraryId = _.findWhere(libraries['Directory'], {type: 'movie'})['Location']['id'];
                            request('http://' + config.plex.url + ':' + config.plex.port + '/library/sections/' + libraryId + '/newest?X-Plex-Token=' + config.plex.token, function (error, response, body) {
                                // See if Plex Media Server is online and how many people are watching.
                                if (!error && response.statusCode == 200) {
                                    var newestMovies = JSON.parse(parser.toJson(body))['MediaContainer'];
                                    res.render('nowPlayingAjax', {
                                        movies: newestMovies.Video
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.render('nowPlayingAjaxNoOnlineUsers', {
                        sessions: sessions
                    });
                }
            } else {
                res.render('nowPlayingAjaxTrakt');
            }
        });
    });

    return app;
})();
