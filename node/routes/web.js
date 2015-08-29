var express = require('express'),
    parser = require('xml2json'),
    request = require('request'),
    _ = require('underscore'),
    diskUsage = require('diskusage'),
    pretty = require('prettysize'),
    portscanner = require('portscanner'),
    os = require('os'),
    cpu = require('windows-cpu'),
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

    app.get('/assets/php/left_column_top_ajax.php', function(req, res){
        res.render('leftColumnTopAjax');
    });

    app.get('/assets/php/bandwidth_ajax.php', function(req, res){
        res.render('bandwidthAjax');
    });

    app.get('/assets/php/disk_space_ajax.php', function(req, res){
        var disks = [];
        var totalDiskSpace = 0;
        var totalFree = 0;
        config.disks.forEach(function(disk){
            diskUsage.check(disk.mountPoint, function(err, info) {
                totalDiskSpace = totalDiskSpace+info.total;
                totalFree = totalFree+info.free;
                disks.push({
                    mountPoint: disk.mountPoint,
                    name: disk.name,
                    free: {
                        pretty: pretty(info.free),
                        raw: info.free
                    },
                    total: {
                        pretty: pretty(info.total),
                        raw: info.total
                    }
                });
            });
        });
        // res.send({
        res.render('diskspaceAjax', {
            totalDiskSpace: {
                pretty: pretty(totalDiskSpace),
                raw: totalDiskSpace
            },
            totalFree: {
                pretty: pretty(totalFree),
                raw: totalFree
            },
            disks: disks
        });
    });

    app.get('/assets/php/services_ajax.php', function(req, res){
        config.services.forEach(function(service){
            portscanner.checkPortStatus(service.port, service.url, function(error, status) {
                if(error) console.log(error);
                config.services[config.services.indexOf(service)].status = (status == 'open' ? true : false);
            });
        });
        res.render('servicesAjax', {
            services: config.services
        });
    });

    app.get('/assets/php/system_load_ajax.php', function(req, res){
        var averages = process.platform === 'win32' ? [0, 0, 0] : os.loadavg();
        res.render('getLoadAjax', {
            averages: [{
                title: '1 min',
                percentage: averages[0].toFixed(0)
            },{
                title: '5 min',
                percentage: averages[1].toFixed(0)
            },{
                title: '15 min',
                percentage: averages[2].toFixed(0)
            }]
        });
    });

    return app;
})();
