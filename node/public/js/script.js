// Auto refresh things
(function($) {
    $(document).ready(function() {

        // Assign varibles to DOM sections
        // var $plex_check_refresh = $('#plex_check');
        // var $bandwidth_refresh = $('#bandwidth');
        // var $ping_refresh = $('#ping');
        // var $transcodeSessions = $('#transcodeSessions');

        // Load external php files & assign variables
        // $plex_check_refresh.load("assets/php/plex_check_ajax.php");
        // $bandwidth_refresh.load("assets/php/bandwidth_ajax.php");
        // $ping_refresh.load("assets/php/ping_ajax.php");
        // $transcodeSessions.load("assets/php/transcode_sessions_ajax.php");

        $('#system_load').load("assets/php/system_load_ajax.php");
        $('#services').load("assets/php/services_ajax.php");
        $('#now_playing_title').load("assets/php/now_playing_title_ajax.php");
        $('#now_playing').load("assets/php/now_playing_ajax.php");
        $('#left_column_top').load("assets/php/left_column_top_ajax.php");
        $('#disk_space').load("assets/php/disk_space_ajax.php");

        // var refreshIdfastest = setInterval(function(){
        //     $plex_check_refresh.load("assets/php/plex_check_ajax.php");
        // }, 10000); // at 3 & 5 seconds python was crashing.

        //- var refreshIdfastest = setInterval(function(){
        //-     $system_load_refresh.load("assets/php/system_load_ajax.php");
        //- }, 5000); // 5 seconds

        // var refreshId30 = setInterval(function(){
        //     $bandwidth_refresh.load("assets/php/bandwidth_ajax.php");
        //     $ping_refresh.load("assets/php/ping_ajax.php");
        //     $services_refresh.load("assets/php/services_ajax.php");
        // }, 30000); // 30 seconds

        // var refreshId60 = setInterval(function(){
        //     $transcodeSessions.load("assets/php/transcode_sessions_ajax.php");
        // }, 60000); // 60 seconds

        var refreshIdslow = setInterval(function(){
            $('#disk_space').load("assets/php/disk_space_ajax.php");
        }, 120000); // 2 minutes

        var refreshtopleft = setInterval(function(){
            $('#left_column_top').load("assets/php/left_column_top_ajax.php");
        }, 300000); // 5 minutes

        // // Load these sections only if Plex has changed states
        // var theResource = "assets/caches/plexcheckfile2.txt";
        //
        //  var refreshconditional = setInterval(function(){
        //     if(localStorage["resourcemodified"]) {
        //         $.ajax({
        //             url:theResource,
        //             type:"head",
        //             success:function(res,code,xhr) {
        //                  console.log("Checking to see if plexcheckfile2 changed."+ localStorage["resourcemodified"] + " to "+ xhr.getResponseHeader("Last-Modified"))
        //                  if(localStorage["resourcemodified"] != xhr.getResponseHeader("Last-Modified")) getResource();
        //             }
        //         });
        //       } else {
        //         getResource();
        //           function getResource() {
        //             $.ajax({
        //                 url:theResource,
        //                 type:"get",
        //                 cache:false,
        //                 success:function(res,code,xhr) {
        //                     localStorage["resourcemodified"] = xhr.getResponseHeader("Last-Modified");
        //                     console.log("Updating our cache and refreshing appropriate divs.");
        //                     $left_column_top_refresh.load("assets/php/left_column_top_ajax.php");
        //                     $now_playing_title_refresh.load("assets/php/now_playing_title_ajax.php");
        //                     $now_playing_refresh.load("assets/php/now_playing_ajax.php");
        //                     $transcodeSessions.load("assets/php/transcode_sessions_ajax.php");
        //                 }
        //             });
        //         }
        //     }
        // }, 5000); // 5 seconds

        // // Change the size of the now playing div to match the client size
        // function doResizeNowPlaying() {
        //     var height = 0;
        //     var body = window.document.body;
        //     if (window.innerHeight) {
        //         height = window.innerHeight;
        //     } else if (body.parentElement.clientHeight) {
        //         height = body.parentElement.clientHeight;
        //     } else if (body && body.clientHeight) {
        //         height = body.clientHeight;
        //     }
        //     now_playing.style.height = ((height - now_playing.offsetTop) + "px");
        //     console.log("Div resize complete. New size is: " + height);
        // };
        // // Detect if we are on a mobile device, if we aren't resize the now playing div using doResizeNowPlaying()
        // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //     // some code..
        // } else {
        //     var resizeTimer;
        //     $(window).resize(function() {
        //         clearTimeout(resizeTimer);
        //         resizeTimer = setTimeout(doResizeNowPlaying, 100);
        //     });
        //     // Resize the now playing div 5 seconds after page load
        //     $(function(){
        //            clearTimeout(resizeTimer);
        //         resizeTimer = setTimeout(doResizeNowPlaying, 5000);
        //     });
        // }
        });
})(jQuery);
