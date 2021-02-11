const Discord = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: ["removeInvites"],
  name: 'removebonus',
  description:"Deletes Invitation From Person You Have Specified.",
  category:"Davet Sistemi",
  usage:"davet-sil <@kullanıcı> <miktar>",
  run: async(client, message, args, setting, prefix) => {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))

  let user = message.mentions.users.first()
  let sayı = args[1];
  if(!user){
     const muyarı = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Label the Person You Want to Process! \n Sample Value; \`${prefix}removebonus <@members> <number>\``)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(muyarı);
  }
if(!sayı || isNaN(sayı)) {
    const uyarı = new Discord.MessageEmbed()
     .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Please Specify The Amount of Invitation I Will Delete. \n Sample Value; \`${prefix}removebonus <@members> <number>\``)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(uyarı);
  }
 if(Number(sayı) <= 0){
    const uyarı = new Discord.MessageEmbed()
   .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Enter a Number with Value More Than **0**`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(uyarı);
 }
   db.subtract(`serverData_${message.guild.id}.invites.${user.id}.bonus`, sayı)

  const başarılı = new Discord.MessageEmbed()
   .setColor(setting.color)
  .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
  .setDescription(`Invitation to ${user} ** ${sayı} ** Amount Deletion.`)
  .setTimestamp()
  .setFooter(client.user.username, client.user.avatarURL())
   message.channel.send(başarılı);

}
};
