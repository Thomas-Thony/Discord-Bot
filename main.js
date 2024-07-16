const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const config = require('./config');
const loadCommands = require('./Loaders/loadCommands');
const loadEvents = require('./Loaders/loadEvents');
const { cp } = require('fs');

bot.commands = new Discord.Collection()
loadCommands(bot)
loadEvents(bot)
bot.color = "#ffffff"
bot.login(config.token);

bot.on("ready", () => {
    bot.user.setPresence({
      activities: [{
        name:"Visual Studio Code",
        type: Discord.ActivityType.Playing
      }],
      status:"online"
    })
  });