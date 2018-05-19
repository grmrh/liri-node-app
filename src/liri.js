require("dotenv").config();
var Soundify = require('./soundify.js');
var Movie = require('./movie.js');
var DoWhatItSays = require('./doWhatItSays.js');
//var client = new twitter(keys.twitter);

/**
 * available cli commands
 */
const commands = ['my-tweets',
  'spotify-this-song',
  'movie-this',
  'do-what-it-says'
];

// drive the action to the command
function getStarted(argv) { 
  switch (argv[2]) {
    case commands[0]:
      console.log('twitter command but I do not twitt');
      break;

    case commands[1]:
      //console.log('spotify command, ok, I do soundify.');
      var soundify = new Soundify(null);
      soundify.playSoundify(soundify.init(), argv);
      break;

    case commands[2]:
      //console.log('movie command, requested service coming up...');
      var movie = new Movie(null);
      movie.playMovie(movie.init(), argv);
      break;

    case commands[3]:
      //console.log('do-what-it-says command, follow the leader...');
      var doWhatItSays = new DoWhatItSays(null);
      doWhatItSays.followLeader(doWhatItSays.init());
      break;

    default:
      console.log('${argv[1]} command, sorry we do not serve that command.');
  }
}

getStarted(process.argv);

module.exports = {
  getStarted: getStarted
}