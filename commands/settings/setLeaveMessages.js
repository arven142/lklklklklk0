const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["setleavemessage"],
  name: 'leavemessage',
  category:"Sunucu Ayarları",
  description: 'You Set the Invitation Exit Message',
  usage: 'çıkış-mesaj <default/değer>',
  run: async(client, message, args, setting, prefix) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
  
    
   let oldLeaveMessage = await db.fetch(`serverData_${message.guild.id}.leaveMessage`);
     const embed = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
     
  let leaveMessage = args.slice(0).join(' ')
  if(args[0] == "default"){  
    if(!oldLeaveMessage){
      embed.setDescription(`Exit Message Not Already Set!`)
      return message.channel.send(embed);
    }
     db.delete(`serverData_${message.guild.id}.leaveMessage`);
     embed.setDescription(`Exit Message Successfully Reset!`)
     return message.channel.send(embed)
  }
   if(!leaveMessage){
     embed.setDescription(`Please Specify the Message You Want to Set! \n For Variables \`${prefix}variables\` Just write it!`)
     return message.channel.send(embed)
   } 
    if(leaveMessage == oldLeaveMessage){
     embed.setDescription(`Exit Message Is Already Set!`)
     return message.channel.send(embed)
    }
    if(oldLeaveMessage && leaveMessage !== oldLeaveMessage){
     db.set(`serverData_${message.guild.id}.leaveMessage`, leaveMessage)
     embed.setDescription(`Exit Message Successfully Updated!`)
     return message.channel.send(embed)
    }
     db.set(`serverData_${message.guild.id}.leaveMessage`, leaveMessage)
     embed.setDescription(`Exit Message Successfully Set!`)
     return message.channel.send(embed)
 }
};

