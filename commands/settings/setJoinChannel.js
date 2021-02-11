const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["set-join-channel"],
  name: 'joinchannel',
  category:"Sunucu Ayarları",
  description: 'You set the Invitation Login Channel!',
  usage: 'giriş-kanal <default/değer>',
  run: async(client, message, args, setting) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))  
  
    
   let joinChannel = await db.fetch(`serverData_${message.guild.id}.joinChannel`);
     const embed = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
     
   let channel = message.mentions.channels.first();
  if(args[0] == "default"){  
    if(!joinChannel){
      embed.setDescription(`Input Channel Not Set Up Already!`)
      return message.channel.send(embed);
    }
     db.delete(`serverData_${message.guild.id}.joinChannel`);
     embed.setDescription(`Invitation Entry Channel Successfully Reset!`)
     return message.channel.send(embed)
  }
   if(!channel){
     embed.setDescription(`Please Label the Channel You Want to Set!`)
     return message.channel.send(embed)
   } 
    if(channel.id == joinChannel){
     embed.setDescription(`Input Channel Is Already Set to ${channel}!`)
     return message.channel.send(embed)
    }
    if(joinChannel && channel.id !== joinChannel){
     db.set(`serverData_${message.guild.id}.joinChannel`, channel.id)
     embed.setDescription(`Login Channel Successfully Updated to ${channel}!`)
     return message.channel.send(embed)
    }
     db.set(`serverData_${message.guild.id}.joinChannel`, channel.id)
     embed.setDescription(`Login Channel Successfully Set to ${channel}!`)
     return message.channel.send(embed)
 }
};

