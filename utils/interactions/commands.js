const fs = require('fs');
const { BotLog } = require('../log');

async function commands(command) {

  // Send list of all files in downloads folder
  if (command.commandName === 'listfiles') {
    const files = fs.readdirSync('./downloads');

    command.reply({
      content: files.length > 0 ? `**File list** (${files.length})\n\`\`\`\n${files.join('\n')}\`\`\`` : '**No Files**'
    });

    BotLog.action('Listed files');
  }

  return;
}

module.exports = {
  commands
}