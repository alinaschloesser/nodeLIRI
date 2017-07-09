//require
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

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

var title;
var year;
var IMDBrating;
var RotTomRating;
var country;
var language;
var plot;
var actors;

function movieMaking() {
    if (specific == undefined) {
        request('http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=40e9cece', function(error, response, body) {
            if (err) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
            } else {
                title = JSON.parse(body).Title;
                year = JSON.parse(body).Year;
                IMDBrating = JSON.parse(body).imdbRating;
                RotTomRating = JSON.parse(body).Ratings[1].Value;
                country = JSON.parse(body).Country;
                language = JSON.parse(body).Language;
                plot = JSON.parse(body).Plot;
                actors = JSON.parse(body).Actors;

                console.log('Title: ' + title);
                console.log('Year: ' + year);
                console.log('IMDB Rating: ' + IMDBrating);
                console.log('Rotten Tomatoes: ' + RotTomRating);
                console.log('Country: ' + country);
                console.log('Language: ' + language);
                console.log('Plot: ' + plot);
                console.log('Actors: ' + actors);
            }
        });
    } else {

        request('http://www.omdbapi.com/?t=+' + specific + '&y=&plot=short&apikey=40e9cece', function(error, response, body) {
            if (error) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
            } else {
                title = JSON.parse(body).Title;
                year = JSON.parse(body).Year;
                IMDBrating = JSON.parse(body).imdbRating;
                RotTomRating = JSON.parse(body).Ratings[1].Value;
                country = JSON.parse(body).Country;
                language = JSON.parse(body).Language;
                plot = JSON.parse(body).Plot;
                actors = JSON.parse(body).Actors;

                console.log('Title: ' + title);
                console.log('Year: ' + year);
                console.log('IMDB Rating: ' + IMDBrating);
                console.log('Rotten Tomatoes: ' + RotTomRating);
                console.log('Country: ' + country);
                console.log('Language: ' + language);
                console.log('Plot: ' + plot);
                console.log('Actors: ' + actors);
            }

        });
    }
}

function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        var dataArr = data.split(",");
        command = dataArr[0];
        specific = dataArr[1];
        spotifySong();

    });

}


//run app
if (command == "my-tweets") {
    getTweets();
} else if (command == "spotify-this-song") {
    spotifySong();
} else if (command == "movie-this") {
    movieMaking();
} else if (command == "do-what-it-says") {
    doThis();
}
