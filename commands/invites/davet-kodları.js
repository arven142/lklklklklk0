const Discord = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: [],
  name: 'invitation-codes',
  description:"Displays Invite Codes on Server.",
  category:"Davet Sistemi",
  usage:"ödül-düzenle",
  run: async(client, message, args, setting) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
 if(!message.guild.me.hasPermission('CREATE_INSTANT_INVITE'))  return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("I don't have enough privileges to use this command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
     let invites = await message.guild.fetchInvites()
        invites = invites.array();

  if(!invites){
      const embedYok = new Discord.MessageEmbed()
       .setColor(setting.color)
      .setDescription(`There are No Invitations on the Server`)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      return message.channel.send(embedYok);
    }   
 
      let map = invites.sort((a,b) => b.uses - a.uses).map(invite => `**[Connection](${invite.url})** - ${invite.inviter} - (**${invite.uses}** Usage, **${invite.maxUses}** Boundary)`)
      let pages =  map.slice(0 , 10)
      const embedListe = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(client.user.username, client.user.avatarURL())
     .setDescription(pages)
     .setFooter(client.user.username, client.user.displayAvatarURL())
     .setTimestamp()
     let msg = await message.channel.send(embedListe)
  
 }
};
