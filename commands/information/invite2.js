const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
module.exports = { 	
  enabled: true,
  aliases: ["votssses"],
  name: 'votssssse',
  description:"Bot Vote Link", 
 // category:"Bilgi",
  usage:"sunucu-bilgi",
  run: async(client, message, args, setting) => {
    

const duration = moment.duration(client.uptime).format('M [Month], D [Day], H [Hour], m [Minute], s [Second]');     
const embed = new Discord.MessageEmbed()
 .setColor(setting.color)
.setColor(setting.color)
    .setTitle("Vote ")
    .setDescription(`[Click](https://top.gg/bot/776471578586120213/vote)`)
    .setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
  message.channel.send(embed)
  }
};
