const { default: axios } = require("axios");
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require("discord.js");
const fs = require('fs');
const path = require('path');
const { BotLog } = require("./log");

// Download file
async function downloadAttachment(url, name) {

  // Define path and file writer
  const filePath = path.resolve(__dirname, '../downloads', name)
  const writer = fs.createWriteStream(filePath)

  // Get file
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  // Save file
  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

// Save attachments
async function saveAttachments(msg) {

  msg.attachments.forEach(async attachment => {

    let success = true;
    let filePrefix = new Date().getTime();
    let fileName = `${filePrefix}-${attachment.name}`;

    // Download attachment
    await downloadAttachment(attachment.url, fileName).catch(err => {
      success = false;
    });

    // Success or error embed
    const embed = new Discord.MessageEmbed()
      .setColor(success ? '#43a047' : '#e53935')
      .setTitle(success ? 'Success!' : 'Error.')
      .setThumbnail('http://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-alt/512/Downloads-icon.png')
      .setImage(attachment.url)
      .setTimestamp()
      .setFooter('Savebot')
      .setAuthor('Created by da_stoi#4834', 'https://daniel.stoiber.network/images/avatar.png', 'https://daniel.stoiber.network');

    // Delete button
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`deleteFile:${filePrefix}`)
          .setLabel('Delete File')
          .setStyle('DANGER')
          .setEmoji('🗑')
      );

    // Send reply
    msg.reply({ embeds: [embed], components: [row] });
    BotLog.action(`Saved ${fileName}`);
  });

  return;
}

module.exports = {
  saveAttachments
}