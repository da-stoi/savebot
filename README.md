# Savebot
[Project Page](https://daniel.stoiber.network/project/savebot)

Savebot is a Discord bot that saves all attachments DMed to it to the computer running the bot. I made this bot mainly to be able to use Android's quick share menu to save files to my Desktop computer at home from anywhere without the need to VPN and connect to my file server.

### How to use
__DISCLAIMER:__ Adding this bot to server allows __anyone__ on that server to save __any__ file to __your computer__. That is __incredibly dangerous__, and there are so many reasons you would not want to do that. If you use this, make sure you only add the bot to a private server where you are the only member.

1. Download the project.
1. Create a Bot. Go to the [Discord Developer Portal](https://discord.com/developers) and press __New Application__. Call it whatever you'd like. Then select Bot, and press __Add Bot__. Press __Copy__ under the token section.
1. Add a `.env` file to the main project folder. Inside you will want to add the environment variable `DISCORD_BOT_TOKEN` and set it equal to the value you just copied. Ex.`DISCORD_BOT_TOKEN=00000000`
1. Make sure you have [Node](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/en/docs/install) installed.
1. Navigate to the project folder in your terminal and install the node modules. `yarn install`
1. If you don't have one already, create a brand new server in Discord, and never invite anyone to this server. (See the disclaimer for more details.)
1.  Go back to the [Discord Developer Portal](https://discord.com/developers) and in your app press __OAuth2__. Select the *bot* checkbox and press __Copy__. (The bot does not need any permissions since you will only be sending it DMs) Go to the URL you just copied.
1. This part can very dangerous. Select your private Discord server. Double and triple check you are selecting the correct server. Then press __Authorize__.
1. The last thing to do is to run the bot. Back in your terminal, type `yarn start`. You'll know it worked when it says `Discord bot logged in as <your bot's name>!`

### Troubleshooting
If you come across any problems running the bot, check to see if there is a `bot.log` file in main directory. If there is, check whether or not it has logged some errors.