const {MessageEmbed} = require("discord.js");
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
module.exports = { 	
  enabled: true,
  aliases: [],
  name: 'members',
  description:"Assigns Server Member Information.",
  category:"Bilgi",
  usage:"üyeler",
  run: async(client, message, args, setting) => {
  let günde = message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size
  let haftada = message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size
  let ayda = message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size
  let çevrimiçi = message.guild.members.cache.filter(on => on.presence.status == "online").size
  let boşta = message.guild.members.cache.filter(i => i.presence.status === 'idle').size
  let dnd = message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size
  let toplam = (çevrimiçi + boşta + dnd)
  
  let bot = message.guild.members.cache.filter( member => member.user.bot).size
  //let insan = message.guild.members.cache.filter( member => !member.user.bot).size
     const embed = new MessageEmbed()
     .setColor(setting.color)
    .addField("Members", message.guild.memberCount, true)
    .addField("Onlines", toplam, true)
    .addField("Peoples", (message.guild.memberCount - bot), true)
    .addField("Bots", bot, true)
    .addField("Joined in the Last 24 Hours", günde, true)
    .addField("Attended This Week", haftada, true)
    .addField("Joined This Month", ayda, true)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp()
    message.channel.send(embed)

  }
};
