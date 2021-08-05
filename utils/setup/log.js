const fs = require('fs');
const { BotLog } = require('../log');

async function log() {

  // Create log file if it does not exist
  if (!fs.existsSync('./bot.log')) {
    fs.writeFileSync('./bot.log', '');
    BotLog.action('Bot log file created');
  }
}

module.exports = {
  log
}