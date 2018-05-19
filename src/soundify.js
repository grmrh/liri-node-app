var Log = require('./log.js');
var log = new Log(null);

class Soundify {

  constructor(param) {
    this.count = (param && param.count) || null;
    this.artists = (param && param.artists) || null;
    this.name = (param && param.name) || null;
    this.previewLink = (param && param.previewLink) || null;
    this.albumName = (param && param.albumName) || null;
  }

  displayResult() {

    var content = `   
      ${this.count}
      artists(s): ${this.artists} 
      song name: ${this.name}
      preview song: ${this.previewLink} 
      album: ${this.albumName} 
      `;

    console.log(content);
    // log 
    log.logging(content);
  }

  init() {
    var keys = require('./keys.js');
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    return spotify;
  }

  playSoundify(spotify, command) {

    var trackName = command.splice(3, command.length - 3).join(' ');
    log.logging(`
    COMMAND: node liri spotify-this-song ${trackName}
    `);

    //console.log(`Title: ${trackName}`);
    spotify.search({
        type: 'track',
        query: trackName,
        limit: 20
      })
      .then(function (response) {
        var res = response.tracks.items;
        var param = {};
        var artists = [];
        var count = 0;

        res.forEach(item => {
          item.album.artists.forEach(x => {
            artists.push(x.name)
          });

          param.artists = artists.toString();
          param.name = item.name;
          param.previewLink = item.preview_url;
          param.albumName = item.album.name;
          param.count = ++count;

          // console.log(`item.name: ${item.name}, item.type: ${item.type}`)
          // console.log(`item.album.name: ${item.album.name}, item.type: ${item.album.type}`)

          var soundify = new Soundify(param);
          soundify.displayResult();

          param = {};
          artists = [];
        });

      })
      .catch(
        function (err) {
          console.log(err);
      });
  }

}

module.exports = Soundify;



