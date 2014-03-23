# Echo Nest Radio

This is a demo app that shows how to use The Echo Nest API with the Spotify API to generate Echo Nest playlists for the currently playing song.

## Getting started

 1. Sign up for a [developer account on Spotify](https://developer.spotify.com/technologies/apps/#developer) by logging in and agreeing to the [terms of use] (https://developer.spotify.com/technologies/apps/terms-of-use/).
 2. Sign up for a [developer account at The Echo Nest](http://developer.echonest.com)
 2. Create the Spotify folder if it doesn't exist already: `~/Spotify` (Mac OS X and Linux) or `My Documents\Spotify` (Windows).
 3. Open the Spotify folder.
 4. Run `git clone git://github.com/spotify/echo-nest-radio.git echo-nest-radio`.
 5. Download [the desktop client of Spotify](http://spotify.com/download).
 6. Open the desktop client and type `spotify:app:echo-nest-radio` in the Search box.
 7. If the app doesn't load, restart Spotify completely and type again `spotify:app:echo-nest-radio` in the Search box.
 8. Play a song in spotify. Click on the **Generate Playlist** button to generate a playlist
 
 
 The app uses requires the use of an Echo Nest API key. A demo key with a very low rate limit is included in the demo. You should switch this to your own API key. Look for the line with the // CHANGE ME comment in js/enr.js and change the api_key there to your own api key.
 
![Screen shot](https://raw.githubusercontent.com/plamere/spotify-echo-nest-radio/master/ss.png =600x)
