const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["setfakedays"],
  name: 'fakeinvitedays',
  description: 'Fake Account Detection Time Setting for Server!',
  usage: 'sahte-gün <değer>',
  run: async(client, message, args, setting) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
  
   let fakeDay = await db.fetch(`serverData_${message.guild.id}.fakeDay`);
     const embed = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
     
   let newDeğer = Number(args[0]);
   if(!args[0]){
     embed.setDescription(`Please Enter The Duration Value You Want To Set!`)
     return message.channel.send(embed)
   } 
   if(isNaN(newDeğer)){
     embed.setDescription(`The Value You Write Should Be Written By Number!`)
     return message.channel.send(embed)
   } 
    if(Number(newDeğer) < 1){
     embed.setDescription(`The Fake Account Day can be set at least 1 day.`)
     return message.channel.send(embed)
    }
    if(Number(newDeğer) > 30){
     embed.setDescription(`The Fake Account Day can be set to a maximum of 30 days.`)
     return message.channel.send(embed)
    }
    if(newDeğer == (fakeDay || 7)){
     embed.setDescription(`This Value Is Already Set!`)
     return message.channel.send(embed)
    }
    if(fakeDay && newDeğer == 7){  
     db.delete(`serverData_${message.guild.id}.fakeDay`)
     embed.setDescription(`Fake Account Day Has Been Successfully Reset!`)
     return message.channel.send(embed)
  }
     db.set(`serverData_${message.guild.id}.fakeDay`, newDeğer)
     embed.setDescription(`Fake Account Day Successfully Set!`)
     return message.channel.send(embed)
 }
};

