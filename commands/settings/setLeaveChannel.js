const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["setleavechannel"],
  name: 'leavechannel',
  category:"Sunucu Ayarları",
  description: 'You set the Invitation Output Channel!',
  usage: 'çıkış-kanal <default/değer>',
  run: async(client, message, args, setting) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
  
    
   let leaveChannel = await db.fetch(`serverData_${message.guild.id}.leaveChannel`);
     const embed = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
     
   let channel = message.mentions.channels.first();
  if(args[0] == "default"){  
    if(!leaveChannel){
      embed.setDescription(`Output Channel Not Set Up Already!`)
      return message.channel.send(embed);
    }
     db.delete(`serverData_${message.guild.id}.leaveChannel`);
     embed.setDescription(`Exit Channel Successfully Reset!`)
     return message.channel.send(embed)
  }
   if(!channel){
     embed.setDescription(`Please Label the Channel You Want to Set!`)
     return message.channel.send(embed)
   } 
    if(channel.id == leaveChannel){
     embed.setDescription(`Output Channel Is Already Set to ${channel}!`)
     return message.channel.send(embed)
    }
    if(leaveChannel && channel.id !== leaveChannel){
     db.set(`serverData_${message.guild.id}.leaveChannel`, channel.id)
     embed.setDescription(`The Exit Channel Has Been Successfully Updated To ${channel}!`)
     return message.channel.send(embed)
    }
     db.set(`serverData_${message.guild.id}.leaveChannel`, channel.id)
     embed.setDescription(`Output Channel Successfully Set to ${channel}!`)
     return message.channel.send(embed)
 }
};

