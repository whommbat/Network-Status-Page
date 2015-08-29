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
                var json = JSON.parse(parser.toJson(body));
                if(json['MediaContainer']['size'] == 0){
                    request('http://' + config.plex.url + ':' + config.plex.port + '/library/sections?X-Plex-Token=' + config.plex.token, function (error, response, body) {
                        // See if Plex Media Server is online and how many people are watching.
                        if (!error && response.statusCode == 200) {
                            var json = JSON.parse(parser.toJson(body))['MediaContainer'];
                            var libraryId = _.findWhere(json['Directory'], {type: 'movie'})['Location']['id'];
                            request('http://' + config.plex.url + ':' + config.plex.port + '/library/sections/' + libraryId + '/newest?X-Plex-Token=' + config.plex.token, function (error, response, body) {
                                // See if Plex Media Server is online and how many people are watching.
                                if (!error && response.statusCode == 200) {
                                    var json = JSON.parse(parser.toJson(body))['MediaContainer'];
                                    res.render('nowPlayingAjax', {
                                        movies: json.Video
                                    });
                                }
                            });
                        }
                    });
                } else {
                //      $i = 0; // Initiate and assign a value to i & t
                // 		$t = 0; // T is the total amount of sessions
                // 		echo '<div class="col-md-10 col-sm-offset-1">';
                // 		//echo '<div class="col-md-12">';
                // 		foreach ($plexSessionXML->Video as $sessionInfo):
                // 			$t++;
                // 		endforeach;
                // 		foreach ($plexSessionXML->Video as $sessionInfo):
                // 			$mediaKey = $sessionInfo['key'];
                // 			$playerTitle = $sessionInfo->Player['title'];
                // 			$mediaXML = simplexml_load_file($network.':'.$plex_port.$mediaKey);
                // 			$type = $mediaXML->Video['type'];
                // 			echo '<div class="thumbnail">';
                // 			$i++; // Increment i every pass through the array
                // 			if ($type == "movie"):
                // 				// Build information for a movie
                // 				$movieArt = $mediaXML->Video['thumb'];
                // 				$movieTitle = $mediaXML->Video['title'];
                // 				$duration = $plexSessionXML->Video[$i-1]['duration'];
                // 				$viewOffset = $plexSessionXML->Video[$i-1]['viewOffset'];
                // 				$progress = sprintf('%.0f',($viewOffset / $duration) * 100);
                // 				$user = $plexSessionXML->Video[$i-1]->User['title'];
                // 				$device = $plexSessionXML->Video[$i-1]->Player['title'];
                // 				$state = $plexSessionXML->Video[$i-1]->Player['state'];
                // 				// Truncate movie summary if it's more than 50 words
                // 				if (countWords($mediaXML->Video['summary']) < 51):
                // 					$movieSummary = $mediaXML->Video['summary'];
                // 				else:
                // 					$movieSummary = limitWords($mediaXML->Video['summary'],50); // Limit to 50 words
                // 					$movieSummary .= "..."; // Add ellipsis
                // 				endif;
                // 				echo '<img src="plex.php?img='.urlencode($network.':'.$plex_port.$movieArt).'" alt="'.$movieTitle.'">';
                // 				// Make now playing progress bar
                // 				//echo 'div id="now-playing-progress-bar">';
                // 				echo '<div class="progress now-playing-progress-bar">';
                // 				echo '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'.$progress.'" aria-valuemin="0" aria-valuemax="100" style="width: '.$progress.'%">';
                // 				echo '</div>';
                // 				echo '</div>';
                // 				echo '<div class="caption">';
                // 				//echo '<h2 class="exoextralight">'.$movieTitle.'</h2>';
                // 				echo '<p class="exolight" style="margin-top:5px;">'.$movieSummary.'</p>';
                // 				if ($state == "playing"):
                // 					// Show the playing icon
                // 					echo '<span class="glyphicon glyphicon-play"></span>';
                // 				else:
                // 					echo '<span class="glyphicon glyphicon-pause"></span>';
                // 				endif;
                // 				if ($user == ""):
                // 					echo '<p class="exolight">'.$device.'</p>';
                // 				else:
                // 					echo '<p class="exolight">'.$user.'</p>';
                // 				endif;
                // 			else:
                // 				// Build information for a tv show
                // 				$tvArt = $mediaXML->Video['grandparentThumb'];
                // 				$showTitle = $mediaXML->Video['grandparentTitle'];
                // 				$episodeTitle = $mediaXML->Video['title'];
                // 				$episodeSummary = $mediaXML->Video['summary'];
                // 				$episodeSeason = $mediaXML->Video['parentIndex'];
                // 				$episodeNumber = $mediaXML->Video['index'];
                // 				$duration = $plexSessionXML->Video[$i-1]['duration'];
                // 				$viewOffset = $plexSessionXML->Video[$i-1]['viewOffset'];
                // 				$progress = sprintf('%.0f',($viewOffset / $duration) * 100);
                // 				$user = $plexSessionXML->Video[$i-1]->User['title'];
                // 				$device = $plexSessionXML->Video[$i-1]->Player['title'];
                // 				$state = $plexSessionXML->Video[$i-1]->Player['state'];
                // 				//echo '<div class="img-overlay">';
                // 				echo '<img src="plex.php?img='.urlencode($network.':'.$plex_port.$tvArt).'" alt="'.$showTitle.'">';
                // 				// Make now playing progress bar
                // 				//echo 'div id="now-playing-progress-bar">';
                // 				echo '<div class="progress now-playing-progress-bar">';
                // 				echo '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="'.$progress.'" aria-valuemin="0" aria-valuemax="100" style="width: '.$progress.'%">';
                // 				echo '</div>';
                // 				echo '</div>';
                // 				//echo '</div>';
                // 				// Make description below thumbnail
                // 				echo '<div class="caption">';
                // 				//echo '<h2 class="exoextralight">'.$showTitle.'</h2>';
                // 				echo '<h3 class="exoextralight" style="margin-top:5px;">Season '.$episodeSeason.'</h3>';
                // 				echo '<h4 class="exoextralight" style="margin-top:5px;">E'.$episodeNumber.' - '.$episodeTitle.'</h4>';
                // 				// Truncate episode summary if it's more than 50 words
                // 				if (countWords($mediaXML->Video['summary']) < 51):
                // 					$episodeSummary = $mediaXML->Video['summary'];
                // 				else:
                // 					$episodeSummary = limitWords($mediaXML->Video['summary'],50); // Limit to 50 words
                // 					$episodeSummary .= "..."; // Add ellipsis
                // 				endif;
                // 				echo '<p class="exolight">'.$episodeSummary.'</p>';
                // 				if ($state == "playing"):
                // 					// Show the playing icon
                // 					echo '<span class="glyphicon glyphicon-play"></span>';
                // 				else:
                // 					echo '<span class="glyphicon glyphicon-pause"></span>';
                // 				endif;
                // 				if ($user == ""):
                // 					echo '<p class="exolight">'.$device.'</p>';
                // 				else:
                // 					echo '<p class="exolight">'.$user.'</p>';
                // 				endif;
                // 			endif;
                // 			// Action buttons if we ever want to do something with them.
                // 			//echo '<p><a href="#" class="btn btn-primary">Action</a> <a href="#" class="btn btn-default">Action</a></p>';
                // 			echo "</div>";
                // 			echo "</div>";
                // 			// Should we make <hr>? Only if there is more than one video and it's not the last thumbnail created.
                // 			if (($i > 0) && ($i < $t)):
                // 				echo '<hr>';
                // 			else:
                // 				// Do nothing
                // 			endif;
                // 		endforeach;
                // 		echo '</div>';
                }
            } else {
                // res.render('nowPlayingAjaxTrakt');
                // function makeRecenlyViewed()
                // {
                // 	global $local_pfsense_ip;
                // 	global $plex_port;
                // 	global $trakt_username;
                // 	global $weather_lat;
                // 	global $weather_long;
                // 	global $weather_name;
                // 	$network = getNetwork();
                // 	$clientIP = get_client_ip();
                // 	$plexSessionXML = simplexml_load_file($network.':'.$plex_port.'/status/sessions');
                // 	$trakt_url = 'http://trakt.tv/user/'.$trakt_username.'/widgets/watched/all-tvthumb.jpg';
                // 	$traktThumb = '/Users/zeus/Sites/d4rk.co/assets/caches/thumbnails/all-tvthumb.jpg';
                //
                // 	echo '<div class="col-md-12">';
                // 	echo '<a href="http://trakt.tv/user/'.$trakt_username.'" class="thumbnail">';
                // 	if (file_exists($traktThumb) && (filemtime($traktThumb) > (time() - 60 * 15))) {
                // 		// Trakt image is less than 15 minutes old.
                // 		// Don't refresh the image, just use the file as-is.
                // 		echo '<img src="'.$network.'/assets/caches/thumbnails/all-tvthumb.jpg" alt="trakt.tv" class="img-responsive"></a>';
                // 	} else {
                // 		// Either file doesn't exist or our cache is out of date,
                // 		// so check if the server has different data,
                // 		// if it does, load the data from our remote server and also save it over our cache for next time.
                // 		$thumbFromTrakt_md5 = md5_file($trakt_url);
                // 		$traktThumb_md5 = md5_file($traktThumb);
                // 		if ($thumbFromTrakt_md5 === $traktThumb_md5) {
                // 			echo '<img src="'.$network.'/assets/caches/thumbnails/all-tvthumb.jpg" alt="trakt.tv" class="img-responsive"></a>';
                // 		} else {
                // 			$thumbFromTrakt = file_get_contents($trakt_url);
                // 			file_put_contents($traktThumb, $thumbFromTrakt, LOCK_EX);
                // 			echo '<img src="'.$network.'/assets/caches/thumbnails/all-tvthumb.jpg" alt="trakt.tv" class="img-responsive"></a>';
                //
                // 		}
                // 	}
                // 	// This checks to see if you are inside your local network. If you are it gives you the forecast as well.
                // 	if($clientIP == $local_pfsense_ip && count($plexSessionXML->Video) == 0) {
                // 		echo '<hr>';
                // 		echo '<h1 class="exoextralight" style="margin-top:5px;">';
                // 		echo 'Forecast</h1>';
                // 		echo '<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat='.$weather_lat.'&lon='.$weather_long.'&name='.$weather_name.'"> </iframe>';
                // 	}
                // 	echo '</div>';
                // }
            }
        });

        // <?php
        // 	Ini_Set( 'display_errors', true );
        // 	include '../../init.php';
        // 	include ROOT_DIR . '/assets/php/functions.php';
        //
        // makeNowPlaying();
        // ?>
        // <script>
        // 	// Enable bootstrap tooltips
        // 	$(function ()
        // 		{ $("[rel=tooltip]").tooltip();
        // 	});
        //
        // 	$('.carousel').carousel({
        //   		interval: 30000
        // 	})
        // </script>
    });

    return app;
})();
