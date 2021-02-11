const Discord = require("discord.js");
const moment = require('moment')
module.exports = { 	
  enabled: true,
  aliases: ["serverinfo"],
  name: 'serverinfo',
  description:"Shows Information About the Server.",
  category:"Bilgi",
  usage:"sunucu-bilgi",
  run: async(client, message, args, setting) => {
  let çevrimiçi = message.guild.members.cache.filter(on => on.presence.status == "online").size
  let çevrimdışı = message.guild.members.cache.filter(off => off.presence.status == 'offline').size
  let boşta = message.guild.members.cache.filter(i => i.presence.status === 'idle').size
  let dnd = message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size
  let sesli = message.guild.channels.cache.filter(chan => chan.type === 'voice').size
  let text = message.guild.channels.cache.filter(chan => chan.type === 'text').size
  let kategori = message.guild.channels.cache.filter(chan => chan.type === 'category').size
  let günde = message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size
  let haftada = message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size
  let ayda = message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size
  let güvenlik = message.guild.verificationLevel;
  let sayı = güvenlik.replace("LOW","Low").replace("MEDIUM","Medıum").replace("HIGH","Hıgh").replace("HIGHEST","Hıghest")
  
   const embed = new Discord.MessageEmbed()
    .setColor(setting.color)
   .setThumbnail(message.guild.iconURL({dynamic: true}))
   .setAuthor(message.guild.name, message.guild.iconURL())
   .setDescription(`**Owner :** ${message.guild.owner}\n▫️ **Date of Creation:** ${moment.utc(message.guild.createdAt).format('DD/MM/YYYY')}\n▫️ **Security Level:** ${sayı}\n▫️ **Server Region:** ${message.guild.region}\n\n**__About the User__**\n**Total :** ${message.guild.memberCount} - **Bot :** ${message.guild.members.cache.filter( member => member.user.bot).size}\n**Online :** ${çevrimiçi} - **DND :** ${dnd} - **İdle :** ${boşta} - **Offline :** ${çevrimdışı}\n▫️ **Entered Within 1 Day:** ${günde}\n▫️ **Entered Within 1 Week:** ${haftada}\n▫️ **Entered Within 1 Month:** ${ayda}\n\n **__Channels__**\n**Text Channels :** ${text} - **Voice Channels :** ${sesli} - **Category :** ${kategori}\n`)
   .setTimestamp()
   .setFooter(`${message.author.tag}`,message.author.avatarURL({dynamic: true}))
   message.channel.send(embed)
  }
};
