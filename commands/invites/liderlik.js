const Discord = require('discord.js');
const db = require('quick.db');
module.exports = { 	
  enabled: true,
  aliases: ["leaderboard"],
  name: 'top',
  category:"Bilgi",
  description: 'Indicates the Order of Invitees on the Server.',
  usage: 'liderlik-tablosu',
  run: async(client, message, args, setting) => {
 let leaderBoardType = await db.fetch(`typeLeaderboard.${message.guild.id}`) 
 const obj = db.fetch(`serverData_${message.guild.id}.invites`) || {}; 

let members = Object.keys(obj).map(memberID_ => {
  
  return {
        memberID: memberID_,
        regular: ( obj[memberID_].çıkan || 0 ) + (obj[memberID_].davet || 0) + (obj[memberID_].regular || 0) + (obj[memberID_].sahte || 0),
        davet: ( obj[memberID_].davet || 0) + (obj[memberID_].bonus || 0) + (obj[memberID_].regular || 0),
        bonus: (obj[memberID_].bonus || 0),
        leave: (obj[memberID_].çıkan || 0),
        fake: (obj[memberID_].sahte || 0)
    }
}).filter(user => user.davet >= 1).sort((x, y) => y.davet - x.davet);

 const embed = new Discord.MessageEmbed().setColor(setting.color).setFooter(client.user.username, client.user.avatarURL()).setTimestamp()

 if(members.length < 1){
    embed.setDescription(`Nobody On The Server With Invitation, So The Table Cannot Be Displayed`)
   return message.channel.send(embed)
  } 
  
 
let  leaderBoard =  members.map((data, totalMemberCount) => `🔹 **#${totalMemberCount + 1}** <@${data.memberID}> - **${data.davet}** Invites! (**${data.regular}** Regular, **${data.bonus}** Bonus, **${data.fake > 0 ? `-${data.fake}` : data.fake}** Fake, **${data.leave > 0 ? `-${data.leave}` : data.leave}** Leave)`)

 let HomePage = leaderBoard.slice(0 ,10).join("\n")

    
  embed.setDescription(`${HomePage}`)
  .setAuthor(message.guild.name + " | Leaderboard", message.guild.iconURL() || message.author.avatarURL())
   message.channel.send(embed)

 }
};

