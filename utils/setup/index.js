const { BotLog } = require("../log");
const { log } = require("./log")
const { commands } = require("./commands");
const { fileStructure } = require("./fileStructure");

async function checkSetup(botId) {
  
  await log();
  await commands(botId);
  await fileStructure();

  BotLog.success('Completed setup check');
}

module.exports = {
  checkSetup
}