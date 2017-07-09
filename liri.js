//require
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//commands
var command = process.argv[2];
var specific = process.argv[3];


//functions
function getTweets() {

    var client = new Twitter(
        keys.twitterKeys
    );

    var params = {
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);

            }
        } else if (error) {
            console.log(error);
        }
    });
}

function spotifySong() {

    var spotify = new Spotify(
        keys.spotifyKey
    );
    var artists;
    var songName;
    var previewLink;
    var albumName;


    if (specific == undefined) {

        spotify.search({
            type: 'track',
            query: 'The Sign',
            limit: 1
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            artists = JSON.stringify(data.tracks.items[0].album.artists[0].name);
            songName = JSON.stringify(data.tracks.items[0].album.name);
            previewLink = JSON.stringify(data.tracks.items[0].preview_url);
            albumName = JSON.stringify(data.tracks.items[0].name);


            console.log("Artist(s):  " + artists);
            console.log("Song name:  " + songName);
            console.log("Preview link:  " + previewLink);
            console.log("Album name:  " + albumName);

        });
    } else {
        spotify.search({
            type: 'track',
            query: specific
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name));

            artists = JSON.stringify(data.tracks.items[0].album.artists[0].name);
            songName = JSON.stringify(data.tracks.items[0].album.name);
            previewLink = JSON.stringify(data.tracks.items[0].preview_url);
            albumName = JSON.stringify(data.tracks.items[0].name);


            console.log("Artist(s):  " + artists);
            console.log("Song name:  " + songName);
            console.log("Preview link:  " + previewLink);
            console.log("Album name:  " + albumName);

        });

    }
}


function movieMaking() {
    if (specific == undefined) {
        request('http://www.omdbapi.com/?i=tt3896198&&t=Mr.+Nobody&apikey=f159ce78', function(error, response, body) {
            http: //www.omdbapi.com/?t=Mr.+Nobody
                console.log('error:', error); // Print the error if one occurred 
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            console.log('body:', body); // Print the HTML for the Google homepage. 
        });
    } else {}

}

function doThis() {
    console.log("yes master");
}


//run app
if (command == "my-tweets") {
    console.log("tweets working");
    getTweets();
} else if (command == "spotify-this-song") {
    console.log("spotify working");
    spotifySong();
} else if (command == "movie-this") {
    console.log("movies working");
    movieMaking();
} else if (command == "do-what-it-says") {
    console.log("do this working");
    doThis();
}
