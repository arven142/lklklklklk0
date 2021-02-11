const Discord = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: ["createinvite"],
  name: 'create-invite',
  description:"It creates an invitation on the channel you are on.",
  category:"Davet Sistemi",
  usage:"davet-oluştur",
  run: async(client, message, args, setting) => {

  if(!client.guilds.cache.get(message.guild.id).member(client.user).hasPermission('CREATE_INSTANT_INVITE'))  return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("I don't have enough privileges to use this command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
  if(!message.member.hasPermission('CREATE_INSTANT_INVITE'))  return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("You Are Not Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))


  message.channel.createInvite({maxAge: 0, maxUses: 0}).then(invite => {
  
    let embed = new Discord.MessageEmbed()
    .setColor(setting.color)
    .setTitle("Invitation Created!")
    .setDescription(`I Opened an Invitation on the ${message.channel} Channel! [Click](${invite})`)
    .setFooter(client.user.username,client.user.avatarURL())
    .setTimestamp()
    message.author.send(embed).catch(() => {
       message.channel.send(embed);
    })

  });

  }
};