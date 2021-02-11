const Discord = require('discord.js');
module.exports = { 	
  enabled: true,
  aliases: ["unban"],
  name: 'unban',
  category: 'moderation',  
  description:"Shows Information About the Server.",
  //category:"Bilgi",

 run: async(client, message, args, setting) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
 var guild = message.guild;
 var banlayan = message.author.tag;
 if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("No Person Found! Please Enter Your ID Correct!"));
 var kisi = args[0];
 //var gun = args.slice(1).join(' ') ? `${args.slice(1).join(' ')}` :"";
 

 if (!kisi) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("No Person Found! Please Enter Your ID Correct!"));

 await message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("User with ID has been unbanned."));
 await guild.members.unban(kisi);


 }



 };