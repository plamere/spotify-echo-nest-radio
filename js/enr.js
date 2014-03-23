/**
 *      by @plamere             
 *		https://github.com/plamere/echo-nest-radio
 */

$.ajaxSetup({ cache: false, traditional:true });

// this is a demo key with a low rate limit.    
// get your own key at developer.echonest.com

var api_key = 'ECLJI0GPBJVEXSZDT';      // CHANGE ME
var numTracks = 40;

require([
    '$api/models',
    '$views/list#List'], 

    function(models, List) {
        var player = models.player;
        var curTrack = null;

        function updateStatus(track) {
            if (track) {
                curTrack = track;
                $("#now-playing").text(curTrack.name + " by " + curTrack.artists[0].name);
            }
        }

        models.player.addEventListener('change', function(p) {
            updateStatus(p.data.track);
        });

        $("#go").click(function() {
            if (curTrack) {
                createPlaylist(curTrack);
            }
        });

        models.player.load('track').done(function(p) {
            updateStatus(p.track);
        });

        function showPlaylist(songs) {
            models.Playlist.createTemporary('temp_' + new Date().getTime()).done(function(tempPlaylist) {
                tempPlaylist.load('tracks').done( 
                  function(playlist) {
                    var tracks = [];
                    $.each(songs, function(num,song){
                        var uri = song.tracks[0].foreign_id;
                        uri = uri.replace('-WW', '');
                        tracks.push(models.Track.fromURI(uri));
                    });
                    playlist.tracks.add.apply(playlist.tracks, tracks).done(function(tracks) {
                        var playlistList = List.forPlaylist(playlist);
                        playlistList.init();
                        $("#radio-tracks").empty();
                        $("#radio-tracks").append(playlistList.node);
                    });
                });
            });
        }

        function fetchSongRadioPlaylist(track) {
            var track_uri = track.uri;
            track_uri = track_uri.replace('spotify', 'spotify-WW');
            var url = 'http://developer.echonest.com/api/v4/playlist/static';
            $.getJSON(url, {
                api_key: api_key,
                track_id: track_uri,
                results:numTracks,
                bucket:['id:spotify-WW', 'tracks'],
                limit:true,
                type:'song-radio'
            }, function(data) {
                showPlaylist(data.response.songs);
            }).error(function() {
                // if we can't get the playlist by ID, get it by
                // artist id
                var artist_id = track.artists[0].uri;
                var artist_name = track.artists[0].name;
                artist_id = artist_id.replace('spotify', 'spotify-WW');
                fetchArtistRadioPlaylist(artist_id, artist_name);
            });
        }

        function fetchArtistRadioPlaylist(aid, name) {
            var url = 'http://developer.echonest.com/api/v4/playlist/static';
            $.getJSON(url, {
                api_key: api_key,
                artist_id: aid,
                results:numTracks,
                bucket:['id:spotify-WW', 'tracks'],
                limit:true,
                type:'artist-radio'
            }, function(data) {
                showPlaylist(data.response.songs);
            }).error(function() {
                // if we can't get the playlist by artist ID, get it by
                // artist name
                fetchArtistRadioPlaylistByName(name);
            });
        }

        function fetchArtistRadioPlaylistByName(name) {
            var url = 'http://developer.echonest.com/api/v4/playlist/static';
            $.getJSON(url, {
                api_key: api_key,
                artist: name,
                results:numTracks,
                bucket:['id:spotify-WW', 'tracks'],
                limit:true,
                type:'artist-radio'
            }, function(data) {
                showPlaylist(data.response.songs);
            }).error(function() {
                info("Sorry, can't make that playlist");
            });
        }

        function createPlaylist(track) {
            fetchSongRadioPlaylist(track);
        }

        function info(msg) {
            $("#info").text(msg);
        }
    }
); 
