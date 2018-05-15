require("dotenv").config();
//var client = new twitter(keys.twitter);
/**
 * var possibleArgs = ['my-tweets',
  'spotify-this-song',
  'movie-this',
  'do-what-it-says'
];
 */

class Soundify {

  constructor(params) {
    //this.artists = Array.from(params.artists);
    if (params != null) {
      this.artists = params.artists;
      this.name = params.name;
      this.previewLink = params.previewLink;
      this.albumName = params.albumName;
    }
  }

  displayResult() {
    console.log(
      `      ${this.artists} 
      ${this.name}
      ${this.previewLink} 
      ${this.albumName}`);
  }

  init() {
    var keys = require('./keys.js');
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    return spotify;
  }

  playSoundify(spotify) {
    var args = process.argv;
    var title = args[3];
    spotify.search({
      type: 'track',
      query: 'All the small things',
      limit: 3
    }).then(
      function (response) {
        var res = response.tracks.items;
        var param = {};
        var artists = [];
  
        res.forEach(item => {
          item.album.artists.forEach(x => artists.push(x.name));
          param.artists = artists;
          param.name = item.name;
          param.previewLink = item.album.external_urls.spotify;
          param.albumName = item.album.name;
  
          var soundify = new Soundify(param);
          soundify.displayResult();
  
          param = {};
          artists = [];
          console.log('===========================================');
        });
  
      }).catch(
      function (err) {
        console.log(err);
      });
  }

}

var soundify = new Soundify(null);
soundify.playSoundify(soundify.init());

// Soundify.prototype.playSoundify = function (spotify) {
//   var args = process.argv;
//   var title = args[3];
//   spotify.search({
//     type: 'track',
//     query: 'All the small things',
//     limit: 3
//   }).then(
//     function (response) {
//       var res = response.tracks.items;
//       var param = {};
//       var artists = [];

//       res.forEach(item => {
//         item.album.artists.forEach(x => artists.push(x.name));
//         param.artists = artists;
//         param.name = item.name;
//         param.previewLink = item.album.external_urls.spotify;
//         param.albumName = item.album.name;

//         var soundify = new Soundify(param);
//         soundify.displayResult();

//         param = {};
//         artists = [];
//         console.log('===========================================');
//       });

//     }).catch(
//     function (err) {
//       console.log(err);
//     });
// }


/**
 * usage: commad line
 * node liri.js my-tweets
 * node liri.js spotify-this-song '<song name here>'
 */
// var args = process.argv;
// var title = args[3];
// spotify.search({
//   type: 'track',
//   query: 'All the small things',
//   limit: 3
// }).then(
//   function (response) {
//     var res = response.tracks.items;
//     // res.forEach(item => {
//     //   console.log(item.name);
//     //   console.log(item.album.name);
//     //   console.log(item.album.artists);
//     //   console.log(item.album.external_urls.spotify);  
//     //   console.log('===========================================');  
//     // });

//     var param = {};
//     var artists = [];

//     res.forEach(item => {
//       item.album.artists.forEach(x => artists.push(x.name));
//       param.artists = artists;
//       param.name = item.name;
//       param.previewLink = item.album.external_urls.spotify;
//       param.albumName = item.album.name;

//       var soundify = new Soundify(param);
//       soundify.displayResult();

//       param = {};
//       artists = [];
//       console.log('===========================================');
//     });

//   }).catch(
//   function (err) {
//     console.log(err);
//   });