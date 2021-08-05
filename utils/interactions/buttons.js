const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { BotLog } = require('../log');
const directory = './downloads'

// Find and delete file by prefix
async function deleteFile(deleteId) {

  let deleted = false;
  let fileName;

  // Search for file
  fs.readdirSync(directory).forEach(file => {
    const filePrefix = file.split('-')[0];

    // If the file exists, delete it
    if (filePrefix === deleteId) {
      fs.unlink(path.join(directory, file), err => {
        return false;
      });

      fileName = file;
      deleted = true;
      return;
    }

    return;
  });

  // Return whether the file was deleted or not
  if (deleted) {
    BotLog.action(`Deleted ${fileName}`);
    return fileName;
  }

  BotLog.error(`Unable to delete ${deleteId}`);
  return false;
}

async function buttons(button) {

  // Delete button
  if (button.customId.startsWith('deleteFile:')) {
    const filePrefix = button.customId.split(':')[1];
    const deletedFile = await deleteFile(filePrefix);

    // Edit embed and remove delete button
    const embed = {
      ...button.message.embeds[0],
      description: `File deleted on \`${new Date()}\``
    }

    button.message.edit({ embeds: [embed], components: [] });

    // If the file does not exist
    if (!deletedFile) {
      button.reply({ content: `Unable to find that file.`, ephemeral: true });
      return;
    }

    // Successful file deletion feedback
    button.reply({ content: `Deleted \`${deletedFile}\`` });
    return;
  }

  return;
}

module.exports = {
  buttons
}