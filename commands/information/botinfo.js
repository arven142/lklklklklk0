const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment');
const os = require('os');
require('moment-duration-format');
module.exports = { 	
  enabled: true,
  aliases: ["bot-info"],
  name: 'about',
  description:"Shows information about the bot.", 
  category:"Bilgi",
  usage:"sunucu-bilgi",
  run: async(client, message, args, setting) => {
    

const duration = moment.duration(client.uptime).format('M [Month], D [Day], H [Hour], m [Minute], s [Second]');     
const embed = new Discord.MessageEmbed()
 .setColor(setting.color)
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
//.addField("Project Owner", "<@751064870547357818> <@626408332982353930> <@442686222041612310> ")
.addField("Bot İnformation", `\n️▫️️️️️ **Servers:** ${client.guilds.cache.size}\n▫️️️️️ **Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\n▫️️️️️ **Channels:** ${client.channels.cache.size}\n▫️️️️️ **Emojis:** ${client.emojis.cache.size}\n▫️️️️️ **Commands:** ${client.commands.size}`)
.addField("Project İnformation","▫️️️️️ **Uptime:** "+ duration+"\n▫️️️️️ **Memory Usage:**" + ` ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
.addField("Hosted System", `▫️️️️️ **System:** win32 \n ▫️️️️️ **Operating System:** Windows 10 \n ️▫️️️️️ **Ram:** 8 GB \n ▫️️️️️ **CPU:** Intel(R) Xeon(R) CPU X5675 @ 3.07GHz \n ▫️️️️️ **Bit:** x64 `)
.setFooter(client.user.username, client.user.avatarURL())
.setTimestamp()
  message.channel.send(embed)
  }
};
