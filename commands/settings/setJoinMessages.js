const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["setjoinmessage"],
  name: 'joinmessage',
  category:"Sunucu Ayarları",
  description: 'You Set the Invitation Entry Message',
  usage: 'giriş-mesaj <default/değer>',
  run: async(client, message, args, setting, prefix) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))  
  
    
   let oldJoinMessage = await db.fetch(`serverData_${message.guild.id}.joinMessage`);
     const embed = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
     
  let joinMessage = args.slice(0).join(' ')
  if(args[0] == "default"){  
    if(!oldJoinMessage){
      embed.setDescription(`Login Message Not Already Set!`)
      return message.channel.send(embed);
    }
     db.delete(`serverData_${message.guild.id}.joinMessage`);
     embed.setDescription(`Login Message Successfully Reset!`)
     return message.channel.send(embed)
  }
   if(!joinMessage){
     embed.setDescription(`Please Specify The Message You Want To Set!\nFor Variables \`${prefix}variables\` Just write it! \n Example: \`!joinmessage {user} joined; Invited by {inviter_name} ({inviter_invite} invites)\` `)
     return message.channel.send(embed)
   } 
    if(joinMessage == oldJoinMessage){
     embed.setDescription(`Login Message Already Set!`)
     return message.channel.send(embed)
    }
    if(oldJoinMessage && joinMessage !== oldJoinMessage){
     db.set(`serverData_${message.guild.id}.joinMessage`, joinMessage)
     embed.setDescription(`Introductory Message Successfully Updated!!`)
     return message.channel.send(embed)
    }
     db.set(`serverData_${message.guild.id}.joinMessage`, joinMessage)
     embed.setDescription(`The Introductory Message Has Been Set Successfully!`)
     return message.channel.send(embed)
 }
};

