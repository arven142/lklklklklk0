const Discord = require("discord.js");
const db = require('quick.db');
const moment = require('moment');
require("moment-duration-format");
module.exports = { 	
  enabled: true,
  aliases: ["variables"],
  name: 'variables',
  description:"It Is Used To Indicate Something In The Entry Exit Message!.",
  category:"Bilgi",
  usage:"değişkenler",
  run: async(client, message, args, setting) => {

 let createDate = new Date().getTime() - message.author.createdAt.getTime()
 
   let davet = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.davet`) || 0;
   let fake = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.sahte`) || 0;
   let bonus = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.bonus`) || 0;
   let regular = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.regular`) || 0;
let çıkan = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.çıkan`) || 0;
  let inviteNumber = (davet + bonus + regular)
 
   const embed = new Discord.MessageEmbed()
    .setColor(setting.color)
   .setAuthor("Variables", client.user.avatarURL())
   .setDescription(`
 The Things You See Below When Setting Up The Entry, Exit Messages,
 Make Your Work Easy, and You Can Set Original Posts!

   ▫️ \`{user_name}\` - Shows User's Name. (${message.author.username})
   ▫️ \`{user_tag}\` - Shows User's Tag. (${message.author.tag})
   ▫️ \`{user_id}\` - Shows The User's ID. (${message.author.id})
   ▫️ \`{user}\` - Labels and Shows the User. (${message.author})

   ▫️ \`{user_day}\` - Shows How Many Daily Accounts. (${moment.duration(createDate).format('D')})
   ▫️ \`{user_history}\` - Shows the Date the Account Was Opened. (${moment(message.author.createdAt).format('DD-MM-YYYY')})

   ▫️ \`{inviter_name}\` - Shows The Inviter's Name. (${client.user.username})
   ▫️ \`{inviter_tag}\` - Displays Inviter's Tag. (${client.user.tag})
   ▫️ \`{inviter_id}\` - Shows The Inviter's ID. (${client.user.id})
   ▫️ \`{inviter}\` - Labels and Shows the Invite. (${client.user})

   ▫️ \`{inviter_invite}\` - Shows The Invite the Invitation. (${inviteNumber})
   ▫️ \`{inviter_fake}\` - Shows Invite Her Fake Invitation. (${fake})
   ▫️ \`{server_number}\` - Displays Server Person Number. (${message.guild.memberCount})
   ▫️ \`{server_name}\` - Shows The Server Name. (${message.guild.name})

   ▫️ \`{invite_code}\` - Shows Invite Code. (discord.gg/M4XmDbHcWD)
   ▫️ \`{invite_usage}\` - Demonstrates Invite Usage. (5)
`)
   .setFooter(client.user.username, client.user.displayAvatarURL())
   .setTimestamp()
   message.channel.send(embed)
  }
};