const {MessageEmbed} = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: ["invites"],
  name: 'invites',
  description:"Shows Invitations You Have Made On The Server.",
  category:"Bilgi",
  usage:"davet",
  run: async(client, message, args, setting) => {

   let member = message.mentions.users.first() || message.author;

   let miktar = await db.fetch(`ranks.${message.guild.id}`);
   let davet = db.fetch(`serverData_${message.guild.id}.invites.${member.id}.davet`) || 0;
   let fake = db.fetch(`serverData_${message.guild.id}.invites.${member.id}.sahte`) || 0;
   let çıkış = db.fetch(`serverData_${message.guild.id}.invites.${member.id}.çıkan`) || 0;
   let bonus = db.fetch(`serverData_${message.guild.id}.invites.${member.id}.bonus`) || 0;
   let regular = db.fetch(`serverData_${message.guild.id}.invites.${member.id}.regular`) || 0;
   let gerçekDavet = (davet + bonus + regular)

    let description =  `${member.id === message.author.id ? `You Have **${gerçekDavet}** Invitations!!` : `${member}'of **${gerçekDavet}** Has an Invitation!`} (**${davet  + fake + çıkış + regular}** Regular, **${bonus}** Bonus, **${fake > 0 ? `-${fake}` : fake}** Fake, **${çıkış > 0 ? `-${çıkış}` : çıkış}** Leave)`
     
   const embed = new MessageEmbed()
   .setColor(setting.color)
   .setAuthor(member.tag, member.avatarURL({dynamic:true}))
   .setDescription(description)
   .setFooter(client.user.username, client.user.avatarURL())
   .setTimestamp()
   return message.channel.send(embed)
  
    }
 };
