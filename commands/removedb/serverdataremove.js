const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["serverdataremove"],
  name: 'serverdataremove',
  description: 'You set the Invitation Output Channel!',
  usage: 'çıkış-kanal <default/değer>',
  run: async(client, message, args, setting) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
   
   let channel = message.mentions.channels.first();
  if(args[0] == "default"){  
 
   db.delete(`serverData_${message.guild.id}.leaveMessage`);
    db.delete(`serverData_${message.guild.id}.joinMessage`);
    db.delete(`serverData_${message.guild.id}.joinChannel`);
     db.delete(`serverData_${message.guild.id}.leaveChannel`);
      return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Data of all input and output server data was deleted"));
    }
    db.delete(`serverData_${message.guild.id}.leaveMessage`);
    db.delete(`serverData_${message.guild.id}.joinMessage`);
    db.delete(`serverData_${message.guild.id}.joinChannel`);
    db.delete(`serverData_${message.guild.id}.leaveChannel`);
     return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Data of all input and output server data was deleted"));
  }
  
};



















