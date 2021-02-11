const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
module.exports = { 	
  enabled: true,
  aliases: ["invite"],
  name: 'add',
  description:"Bot İnvite Link", 
  category:"Bilgi",
  usage:"sunucu-bilgi",
  run: async(client, message, args, setting) => {
    

const duration = moment.duration(client.uptime).format('M [Month], D [Day], H [Hour], m [Minute], s [Second]');     
const embed = new Discord.MessageEmbed()
 .setColor(setting.color)
.setColor(setting.color)
    .setTitle("Ghost Tracker")
    .setDescription(`[Click](https://discord.com/oauth2/authorize?client_id=809351972045193237&scope=bot&permissions=8)`)
    .setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
  message.channel.send(embed)
  }
};
