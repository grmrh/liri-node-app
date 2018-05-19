var fs = require('fs');

class Log {
  constructor(param) {
    this.command = (param && param.command) || null;
    this.content = (param && param.content) || null;
  }

  init() {
    var fs = require('fs');
    return fs;
  }

  logging(content) {
    fs.appendFile('log.txt', content, function(error) {
      if (error) {
        return console.log(error);
      }
    });
  }
}

module.exports = Log;