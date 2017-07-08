//require
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//commands
var command = process.argv[2];
var specific = process.argv[3];

//Twitter





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
    if (specific == undefined) {

        spotify.search({
            type: 'track',
            query: 'The Sign',
            limit: 1
        }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name));
            console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name));


            // console.log(JSON.stringify(data, null, 2));


            // console.log(JSON.stringify(data, null, 2));

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


            // console.log(JSON.stringify(data, null, 2));


            // console.log(JSON.stringify(data, null, 2));

        });

    }
}


function movieMaking() {
    console.log("making movies");
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
