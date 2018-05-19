
class DoWhatItSays {
  constructor(param) {
    this.command = (param && param.command) || null;
    this.action = (param && param.action) || null;
  }

  init() {
    var fs = require('fs');
    return fs;
  }

  followLeader(fs) {
    //var DoWhatItSays = new DoWhatItSays(null);
    fs.readFile('random.txt', 'utf8', function(error, readRow) {
      if (error) {
        return console.log(error);
      }

      var rowArr = readRow.split(' ');
      var command = rowArr.splice(0, 1).pop();
      var commandArg = rowArr.join(' ');

      console.log(command, commandArg);
      var cmd = [];
      cmd[0] = 'node';
      cmd[1] = 'liri';
      cmd[2] = command;
      cmd[3] = commandArg;

      var liri = require('./liri.js');
      liri.getStarted(cmd);
    });
  }

  followLeader_v2(fs) {
    var readline = require('readline');
    var lineByline = readline.createInterface({
      input: fs.createReadStream('random.txt')
    });
    
    lineByline.on('line', function(error, readRow) {
      if (error) {
        return console.log(error);
      }

      var rowArr = readRow.split(' ');
      var command = rowArr.splice(0, 1).pop();
      var commandArg = rowArr.join(' ');

      console.log(command, commandArg);
      var cmd = [];
      cmd[0] = 'node';
      cmd[1] = 'liri';
      cmd[2] = command;
      cmd[3] = commandArg;

      var liri = require('./liri.js');
      liri.getStarted(cmd);
    });
  }
}

module.exports = DoWhatItSays;