const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
module.exports = { 	
  enabled: true,
  aliases: ["bot-settings"],
  name: 'botsettings',
  description:"Shows the Bot's In-Server Setting.",
  category:"Bilgi",
  usage:"bot-ayarlar",
  run: async(client, message, args, setting, prefix) => {

   let pref = await db.fetch(`serverData_${message.guild.id}.prefix`) || "!";
   let leaveChannel = await  db.fetch(`serverData_${message.guild.id}.leaveChannel`);
   let loginChannel = await  db.fetch(`serverData_${message.guild.id}.joinChannel`);
   if(leaveChannel) leaveChannel = `<#${leaveChannel}>`
   if(loginChannel) loginChannel = `<#${loginChannel}>`
   let joinMessages = await db.fetch(`serverData_${message.guild.id}.joinMessage`) || "Normal!";
   let leaveMessages = await db.fetch(`serverData_${message.guild.id}.leaveMessage`) || "Normal!";
   let fakeDay = await db.fetch(`serverData_${message.guild.id}.fakeDay`) || 7;

   let davet = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.davet`) || 0;
   let fake = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.sahte`) || 0;
   let bonus = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.bonus`) || 0;
   let regular = db.fetch(`serverData_${message.guild.id}.invites.${message.author.id}.regular`) || 0;
   
 let createDate = new Date().getTime() - message.author.createdAt.getTime()
 let inviteNumber = (davet + bonus + regular)

    

let leaveReplace = leaveMessages.replace("{kullanıcı_adı}", message.author.username).replace("{kullanıcı_tag}", message.author.tag).replace("{kullanıcı_id}", message.author.id).replace("{kullanıcı}", message.author).replace("{kullanıcı_gün}", moment.duration(createDate).format('D')).replace("{kullanıcı_tarih}", moment(message.author.createdAt).format('DD-MM-YYYY'))
                                .replace("{davetci_adı}", client.user.username).replace("{davetci_tag}", client.user.tag).replace("{davetci_id}", client.user.id).replace("{davetci}", client.user).replace("{davetci_davet}", inviteNumber).replace("{davetci_sahte}", fake)
                                .replace("{sunucu_sayı}", message.guild.memberCount).replace("{sunucu_name}", message.guild.name).replace("{davet_kodu}", "A3BeNG2").replace("{davet_kullanım}", "31")

let loginReplace = joinMessages.replace("{kullanıcı_adı}", message.author.username).replace("{kullanıcı_tag}", message.author.tag).replace("{kullanıcı_id}", message.author.id).replace("{kullanıcı}", message.author).replace("{kullanıcı_gün}", moment.duration(createDate).format('D')).replace("{kullanıcı_tarih}", moment(message.author.createdAt).format('DD-MM-YYYY'))
                                .replace("{davetci_adı}", client.user.username).replace("{davetci_tag}", client.user.tag).replace("{davetci_id}", client.user.id).replace("{davetci}", client.user).replace("{davetci_davet}", inviteNumber).replace("{davetci_sahte}", fake)
                                .replace("{sunucu_sayı}", message.guild.memberCount).replace("{sunucu_name}", message.guild.name).replace("{davet_kodu}", "A3BeNG2").replace("{davet_kullanım}", "31")


const embed = new Discord.MessageEmbed()
 .setColor(setting.color)
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setDescription(`All Current Settings on the Server Are Located Here.`)
.addField("Invitation Releases", `\n️▫️️️️️ **Channel:** ${leaveChannel || "Not Set!"} \n▫️️️️️ **Message:** ${leaveReplace}`)                                                                                                                                                                                                       
.addField("Invitation Join", `\n️▫️️️️️ **Channel:** ${loginChannel || "Not Set!"} \n▫️️️️️ **Message:** ${loginReplace}`)
.addField("Fake Account Day", `\n▫️️️️️ **Current Value :** ${fakeDay}`)
.setFooter(client.user.username, client.user.avatarURL())
.setTimestamp()
  message.channel.send(embed).catch(s => {
   return message.channel.send("Potential 2000 Character Limit Exceeded!")
  })
  }
};
