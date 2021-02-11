const Discord = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: ["add-invites"],
  name: 'addbonus',
  description:"Adds an amount of invitation to the person you specified.",
  category:"Davet Sistemi",
  usage:"davet-ekle <@kullanıcı> <miktar>",
  
  run: async(client, message, args, setting, prefix) => {
    
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))

  let user = message.mentions.users.first()
  
  let sayı = args[1];
  if(!user){
     const muyarı = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Please Label the Person You Want to Add an Invitation. \n Sample Value; \`${prefix}addbonus <@user> <number>\``)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(muyarı);
  }
    
if(!sayı || isNaN(sayı)) {
    const uyarı = new Discord.MessageEmbed()
    .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Please Specify the Amount to Add. \n Sample Value; \`${prefix}addbonus <@user> <number>\``)
    .setTimestamp()
   .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(uyarı);
  }
   if(sayı >= 10000){
   return message.channel.send(new Discord.MessageEmbed()
     .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`You can add up to **10000** invitation!`)
    .setFooter(client.user.username , client.user.avatarURL()).setTimestamp())
  }
 db.add(`serverData_${message.guild.id}.invites.${user.id}.bonus`, sayı)
      
  const başarılı = new Discord.MessageEmbed()
   .setColor(setting.color)
  .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
  .setDescription(`**${sayı}** Amount Invitation Added to ${user} Successfully.`)
  .setTimestamp()
  .setFooter(client.user.username, client.user.avatarURL())
   message.channel.send(başarılı);
 }
};
