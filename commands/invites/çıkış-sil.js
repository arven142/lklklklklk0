const Discord = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: ["leavesinviteremove"],
  name: 'leaves-invite-remove',
  description:"Deletes the Invitation Part from the Person You Have Specified.",
  category:"Davet Sistemi",
  usage:"çıkan-sil <@kullanıcı> <miktar>",
  run: async(client, message, args, setting, prefix) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
  
  let user = message.mentions.users.first()
  let sayı = args[1];
  if(!user){
     const muyarı = new Discord.MessageEmbed()
     .setColor(setting.color)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`You Have Not Tagged The Person You Want To Process! \n Sample Value; \`${prefix}leaves-invite-remove <@member> <number>\``)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(muyarı);
  }
if(!sayı || isNaN(sayı)) {
    const uyarı = new Discord.MessageEmbed()
    .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Please Specify the Amount of Invitation I Will Delete. \n Sample Value; \`${prefix}leaves-invite-remove <@member> <sayı>\``)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(uyarı);
  }
 if(Number(sayı) <= 0){
    const uyarı = new Discord.MessageEmbed()
     .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setDescription(`Please \`0\`'Enter a High Value!`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL())
    return message.channel.send(uyarı);
 }
  db.subtract(`serverData_${message.guild.id}.invites.${user.id}.çıkan`, sayı)
  const başarılı = new Discord.MessageEmbed()
   .setColor(setting.color)
  .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
  .setDescription(`${user} From the Invitations of the Named Person **${sayı}** Invitation Deleted!`)
  .setTimestamp()
  .setFooter(client.user.username, client.user.avatarURL())
  return message.channel.send(başarılı);

}
};
