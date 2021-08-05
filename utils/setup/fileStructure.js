const fs = require('fs');
const { BotLog } = require('../log');

async function fileStructure() {

  // Create log file if it does not exist
  if (!fs.existsSync('./downloads')) {
    fs.mkdirSync('./downloads');
    BotLog.action('Downloads folder created');
  }
}

module.exports = {
  fileStructure
}