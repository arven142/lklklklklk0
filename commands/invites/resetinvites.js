const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = { 	
  enabled: true,
  aliases: ["invite-reset"],
  name: 'resetinvites',
  description:"Resets All Invitations of Everyone or a Single Person.",
  category:"Davet Sistemi",
  usage:"davet-sıfırla <everyone/@kullanıcı>",
  run: async(client, message, args, setting, prefix) => {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))

     let members = message.mentions.users.first()
     const filter = m => m.author.id === message.author.id;
   if(args[0] === "everyone"){
     if(message.author.id !== message.guild.ownerID) return message.channel.send(`<@${message.author.id}>, Only Server Owner Can Use This Command.`)
     const embed = new MessageEmbed()
    .setColor(setting.color)
     .setDescription('If You Want To Reset Everyones Invite \n Write "**yes**" To Cancel "**cancel**"!')
     .setFooter(client.user.username, client.user.avatarURL())
      message.channel.send(embed).then(async () => {
        message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(async (collected) => {
          if (collected.first().content.toLowerCase() === 'cancel') return message.reply("Transaction Successfully Canceled!")
          if(collected.first().content.toLowerCase() === 'yes'){
           const embed = new MessageEmbed()
           .setColor(setting.color)
          .setDescription('Please Wait Resetting Everyones Invite on Server.')
          .setFooter(client.user.username, client.user.avatarURL())
          message.channel.send(embed).then(msgBox => {
              setTimeout(() => {
              db.delete(`serverData_${message.guild.id}.invites`)
			  db.delete(`serverData_${message.guild.id}.inviter`)
               const embed = new MessageEmbed()
               .setColor(setting.color)
              .setDescription('All Invitations on Server Reset!')
              .setFooter(client.user.username, client.user.avatarURL())
               msgBox.edit(embed)
              }, 3000)
          })
        }
    })
  })
     
  } else if(members) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))
      const embed = new MessageEmbed()
    .setColor(setting.color)
     .setDescription(`${members} If You Want To Reset The Invitation Of Named Person \n Please Write  "**yes**"  To Cancel  "**cancel**" !`)
     .setFooter(client.user.username, client.user.avatarURL())
     return message.channel.send(embed).then(async () => {
        message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(async (collected) => {
          if (collected.first().content.toLowerCase() === 'cancel') return message.reply("Transaction Successfully Canceled!")
          if(collected.first().content.toLowerCase() === 'yes'){
                   db.delete(`serverData_${message.guild.id}.invites.${members.id}`)
               const embed = new MessageEmbed()
               .setColor(setting.color)
               .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
              .setDescription(`All Invitations from ${members} Reset!`)
              .setFooter(client.user.username, client.user.avatarURL())
            return message.channel.send(embed)
        }
    })
  })
  }
    const embed = new MessageEmbed()
    .setColor(setting.color)
    .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    .setDescription(`Reset Everyone's Invite: \`${prefix}resetinvites everyone\` \nReset User's Invite: \`${prefix}invite-reset <@members>\``)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp()
    return message.channel.send(embed)
   }
};
