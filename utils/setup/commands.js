const { default: axios } = require('axios');
const { BotLog } = require('../log');
const botToken = process.env.DISCORD_BOT_TOKEN

const listfilesCommand = {
  "name": "listfiles",
  "description": "List all files in downloads folder",
  "options": []
}

// Check for slash commands
async function commands(botId) {

  // Get all global slash commands
  const commandsReq = await axios({
    method: 'GET',
    url: `https://discord.com/api/v8/applications/${botId}/commands`,
    headers: {
      Authorization: `Bot ${botToken}`
    }
  }).catch(err => {
    return false;
  });

  if (!commandsReq) {
    BotLog.error('Unable to check for slash commands');
    return;
  }

  let hasListfiles = false;

  commandsReq.data.forEach(cmd => {
    if (cmd.name === 'listfiles') {
      hasListfiles = true;
    }
  });

  // Add slash command if it doesn't exist
  if (!hasListfiles) {
    await axios({
      method: 'POST',
      url: `https://discord.com/api/v8/applications/${botId}/commands`,
      headers: {
        Authorization: `Bot ${botToken}`
      },
      data: listfilesCommand
    }).catch(err => {
      BotLog.error('Unable to add listfiles slash command');
    });

    BotLog.success('Added listfiles slash command');
  }
}

module.exports = {
  commands
}