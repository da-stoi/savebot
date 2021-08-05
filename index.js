// Development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Libraries
const Discord = require('discord.js');

// Utilities
const { buttons } = require('./utils/interactions/buttons');
const { commands } = require('./utils/interactions/commands');
const { saveAttachments } = require('./utils/saveAttachments');
const { checkSetup } = require('./utils/setup');

// Setup
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'] });

// Bot Ready
client.on('ready', async () => {
  client.user.setPresence({ activity: { name: 'Remote Save' } });
  console.log(`Discord Bot logged in as ${client.user.tag}!`);
  checkSetup(client.user.id);
});

// Bot Message Detection
client.on('messageCreate', async msg => {

  // Ignore bot messages
  if (msg.author.bot) return;
  
  // Ignore messages outside of DMs
  if (msg.guildId) return;
  
  // Save message attachments
  await saveAttachments(msg);

  return;
});

// Handle interactions
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    // Handle buttons
    return await buttons(interaction);
  } else if (interaction.isCommand) {
    // Handle slash commands
    return await commands(interaction);
  }

  return;
});

client.login(process.env.DISCORD_BOT_TOKEN);