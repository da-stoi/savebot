const fs = require('fs');

// Log to bot.log
class BotLog {

  // Success log
  static success(message) {
    const timestamp = `[${new Date()}]`;
    fs.appendFileSync('./bot.log', `\n${timestamp} Success: ${message}`);
  }

  // Action log
  static action(message) {
    const timestamp = `[${new Date()}]`;
    fs.appendFileSync('./bot.log', `\n${timestamp} Action: ${message}`);
  }

  // Error log
  static error(message) {
    const timestamp = `[${new Date()}]`;
    fs.appendFileSync('./bot.log', `\n${timestamp} Error: ${message}`);
  }
}

module.exports = {
  BotLog
}