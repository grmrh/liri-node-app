var Log = require('./log.js');
var log = new Log(null);

class Movie {
  constructor(param) {
    this.title = (param && param.title) || null;
    this.year = (param && param.year) || null;
    this.rating = (param && param.rating) || null;
    this.rottenTomatoesRating = (param && param.rottenTomatoesRating) || null;
    this.country = (param && param.country) || null;
    this.language = (param && param.language) || null;
    this.plot = (param && param.plot) || null;
    this.actors = (param && param.actors) || null;
  }

  displayResult(command) {
    log.logging(`
      COMMAND: ${command}`);

    var content = `
      Title: ${this.title}
      Year: ${this.year}
      Rating: ${this.rating}
      Rotten tomatoes rating: ${this.rottenTomatoesRating}
      Country: ${this.country}
      Language: ${this.language}
      Plot: ${this.plot}
      Actors: ${this.actors}
    `;
    console.log(content);

    log.logging(content);
  }

  init() {
    var request = require('request');
    return request;
  }

  playMovie(request, command) {

    // get movie name fom the command arguments
    var movieName = command.splice(3, command.length - 3).join('+');

    // build a query for omdb api
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&apikey=trilogy";
    //console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

      // If the request is successful
      if (error || response.statusCode !== 200) {
        console.log(error);
        return;
      }

      var result = JSON.parse(body);
      var option = {
        title: result.Title,
        year: result.Year,
        rating: result.imdbRating,
        rottenTomatoesRating: result.Ratings && result.Ratings.find(r => r.Source == 'Rotten Tomatoes') ?
          result.Ratings.find(r => r.Source == 'Rotten Tomatoes').Value : null,
        country: result.Country,
        language: result.Language,
        plot: result.Plot,
        actors: result.Actors
      };

      var movie = new Movie(option);
      movie.displayResult('node liri movie-this ' + movieName);

    })

  }
}

module.exports = Movie;