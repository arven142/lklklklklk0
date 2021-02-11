  
const Discord = require('discord.js');
const moment = require('moment');  
const { readdir } = require('fs'); 
const ayarlar = require('./settings/setting.json');
const client = new Discord.Client({  ws: { intents: Discord.Intents.ALL }, disableEveryone: true}); 
const db = client.database = require('quick.db');
let settings = client.settings = ayarlar; 
let commands = client.commands = new Map();
let aliases =  client.aliases = new Map();
 require('moment-duration-format')


client.on("ready", () => {  
  console.log(` ${commands.size} Command`)
  console.log(`Bot Online`)
  client.user.setStatus("online");
  client.user.setActivity(`!help | !add`,{type: "PLAYING"});
}) 

 

 readdir('./commands/', (err, files) => {
   if(err) return console.log(err);
    for(var file of files){
      let fileTi = file
       readdir(`./commands/${file}/`, async(err, files) => {
          for(var file of files){
            if(file.endsWith(".js")){
               let command = require(`./commands/${fileTi}/${file}`)   
                if(!command.name) console.log("Command Error => "+ command)
                if(command.name) commands.set(command.name, command);
                if(command.aliases && command.aliases.length >= 1) command.aliases.forEach(alias =>  aliases.set(alias, command.name))
            }
         } 
      })
   } 
 })








client.on('guildDelete', function(guild){  
  let embed = new Discord.MessageEmbed()
  .setColor(settings.color)
  .setTitle(`${guild.name} Adlı Sunucudan Atıldım!`)
  .setThumbnail(guild.iconURL())
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  client.channels.cache.get("776503436770410496").send(embed)
  db.delete(`serverData_${guild.id}`)
});
 
const invites = client.invites = new Map();

client.on('guildCreate', async function(guild) { 
  let embed = new Discord.MessageEmbed()
  .setColor(settings.color)
  .setTitle(`${guild.name} Adlı Sunucuya Eklendim!`)
  .setThumbnail(guild.iconURL())
  .setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()
  client.channels.cache.get("776503436770410496").send(embed)
  
  if(!guild.members.cache.get(client.user.id).hasPermission("MANAGE_GUILD")) return 
    guild.fetchInvites().then(async function(guildInvites){
      invites.set(guild.id, guildInvites)
    }); 
});

client.on('ready', function() { 
  client.guilds.cache.forEach(g => { 
  if(!g.members.cache.get(client.user.id).hasPermission("MANAGE_GUILD")) return;
      g.fetchInvites().then(guildInvites => { 
        invites.set(g.id, guildInvites) 
      }); 
  });  
});
client.on("inviteCreate", function(invite) {
  if(!invite.guild.members.cache.get(client.user.id).hasPermission("MANAGE_GUILD")) return;
  var invitesGuild = invites.get(invite.guild.id); 
  if(!invitesGuild){
    invite.guild.fetchInvites().then(async function(guildInvites){
      invites.set(invite.guild.id, guildInvites)
    });
  } else {
    invitesGuild.set(invite.code, invite);
    invites.set(invite.guild.id, invitesGuild); 
  }
  
});


client.on("guildMemberAdd", async function(member){
  if(member.user.bot) return;
  let guild = member.guild;
  let channel = await db.fetch(`serverData_${guild.id}.joinChannel`);
  if(!channel) return;
  if(channel && !guild.channels.cache.get(channel)) return;
  let oldGuildInvites = invites.get(guild.id);
  let guildInvites = await guild.fetchInvites().catch(err => {});
  let guildChannel = guild.channels.cache.get(channel);
  if(guildInvites && oldGuildInvites){

    invites.set(guild.id, guildInvites)
    let memberDay = (Date.now() - member.user.createdAt.getTime());
    let loginMessages = await db.fetch(`serverData_${guild.id}.joinMessage`);
    let invite = guildInvites.find(_invite => oldGuildInvites.has(_invite.code) && oldGuildInvites.get(_invite.code).uses < _invite.uses) || oldGuildInvites.find(_invite => !guildInvites.has(_invite.code));
    if(invite && invite.inviter){
    let inviter = await db.fetch(`serverData_${guild.id}.inviter.${member.id}`);
    let fakeDay = await db.fetch(`serverData_${guild.id}.fakeDay`);

     if(fakeDay){
        if(memberDay < fakeDay * 86400000) {
          db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.sahte`, 1);
        } else {
          if(inviter){      
            if(inviter.id === invite.inviter.id){
               db.subtract(`serverData_${guild.id}.invites.${invite.inviter.id}.çıkan`, 1); 
               db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`, 1);
            } else {
              db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`, 1);
            } 
          } else {
           db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`, 1);
         }
        } 
       } else {
        if(memberDay < 604800000) {
          db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.sahte`, 1);
          } else {
          if(inviter){
          if(inviter.id === invite.inviter.id) {
            db.subtract(`serverData_${guild.id}.invites.${invite.inviter.id}.çıkan`, 1); 
            db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`, 1);
            } else {
             db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`, 1);
           }
          } else {
           db.add(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`, 1);
        }
      }
  }
      
      db.set(`serverData_${guild.id}.inviter.${member.id}`, {id: invite.inviter.id, fake: memberDay < 604800000 ? true : false});
      
       let normalInvites = db.fetch(`serverData_${guild.id}.invites.${invite.inviter.id}.davet`) || 0;
       let fakeInvites = db.fetch(`serverData_${guild.id}.invites.${invite.inviter.id}.sahte`) || 0;
       let bonusInvites = db.fetch(`serverData_${guild.id}.invites.${invite.inviter.id}.bonus`) || 0;
       let regularInvites = db.fetch(`serverData_${guild.id}.invites.${invite.inviter.id}.regular`) || 0;
       let totalInvites = (normalInvites + bonusInvites + regularInvites ); 
       let real;
       try{
          real = await client.users.fetch(invite.inviter.id);
        } catch(err) { throw err; }
      
     let succesLoginMessage;
     if(loginMessages) succesLoginMessage = loginMessages.replace("{user_name}", member.user.username).replace("{user_tag}", member.user.tag).replace("{user_id}", member.id).replace("{user}", member).replace("{user_day}", moment.duration(memberDay).format('D')).replace("{user_history}", moment(member.user.createdAt).format('DD-MM-YYYY')).replace("{inviter_name}", real.username || "@delete-user").replace("{inviter_tag}", real.tag || "@delete-user").replace("{inviter_id}", real.id || "@delete-user").replace("{inviter}", real || "@delete-user").replace("{inviter_invite}", totalInvites).replace("{inviter_fake}", fakeInvites).replace("{server_number}", member.guild.memberCount).replace("{server_name}", member.guild.name).replace("{invite_code}", invite.code).replace("{invite_usage}", invite.uses);
     if(!loginMessages) succesLoginMessage = `Welcome ${member} Inviting By: **${real.username || "@delete-user"}** (**${totalInvites}** İnvite!)`;
     guildChannel.send(succesLoginMessage);

      
    } else {
     if(member.guild.vanityURLCode){
        guild.fetchVanityData().then(res => {   
           db.set(`serverData_${guild.id}.inviter.${member.id}`, "vanityURL")
           let vanityURLMessage;
           if(loginMessages) vanityURLMessage = loginMessages.replace("{user_name}", member.user.username).replace("{user_tag}", member.user.tag).replace("{user_id}", member.id).replace("{user}", member).replace("{user_day}", moment.duration(memberDay).format('D')).replace("{user_history}", moment(member.user.createdAt).format('DD-MM-YYYY')).replace("{inviter_name}",  member.guild.name).replace("{inviter_tag}", member.guild.name).replace("{inviter}", `**${guild.name}**`).replace("{inviter_id}", member.guild.id).replace("{inviter_invite}", res.uses || 0).replace("{server_number}", member.guild.memberCount).replace("{server_name}", member.guild.name).replace("{server_number}", res.code).replace("{invite_usage}", res.uses || 0);
           if(!loginMessages) vanityURLMessage = `Welcome ${member}   Inviting By: **${member.guild.name}** (**${res.uses || 0}** İnvite!)`;
           return guildChannel.send(vanityURLMessage)
        })
      } else {
         return guildChannel.send(`Welcome ${member} , I Could Not Find Who Invited!`);
      }
    }
  }
}) 

client.on("guildMemberRemove", async function(member){
  if(member.user.bot) return;
  let guild = member.guild;
  let channel = await db.fetch(`serverData_${guild.id}.leaveChannel`);
  let joinChannel = await db.fetch(`serverData_${guild.id}.joinChannel`);
  let inviter = await db.fetch(`serverData_${guild.id}.inviter.${member.id}`);
  if(joinChannel && !channel){
  if(inviter){
    if(inviter.fake == true){
       db.subtract(`serverData_${guild.id}.invites.${inviter.id}.sahte`, 1);
    } else if(inviter.fake == false) {
       db.subtract(`serverData_${guild.id}.invites.${inviter.id}.davet`, 1);
       db.add(`serverData_${guild.id}.invites.${inviter.id}.çıkan`, 1);
    }
  }
}
  if(!channel) return;
  let leaveMessages = await db.fetch(`serverData_${guild.id}.leaveMessage`);
  let memberDay = (Date.now() - member.user.createdAt.getTime());
  if(inviter){
    if(inviter == "vanityURL"){
       db.delete(`serverData_${guild.id}.inviter.${member.id}`);
       let vanityURLMessage;
       if(leaveMessages) vanityURLMessage = leaveMessages.replace("{user_name}", member.user.username).replace("{user_tag}", member.user.tag).replace("{user_id}", member.id).replace("{user}", member).replace("{user_day}", moment.duration(memberDay).format('D')).replace("{user_history}", moment(member.user.createdAt).format('DD-MM-YYYY')).replace("{inviter_name}",  member.guild.name).replace("{inviter_tag}", member.guild.name).replace("{inviter}", member.guild.name).replace("{inviter_id}", member.guild.id).replace("{inviter_invite}", guild.vanityURLUses).replace("{server_number}", member.guild.memberCount).replace("{server_name}", member.guild.name).replace("{invite_code}", guild.vanityURLCode).replace("{invite_usage}", guild.vanityURLUses || 0);
       if(!leaveMessages) vanityURLMessage = `\`${member.user.tag}\` Leaves! Inviting By: **${member.guild.name}** (**${guild.vanityURLUses || 0}** Invite!)`
      if(guild.channels.cache.get(channel)) return guild.channels.cache.get(channel).send(vanityURLMessage)
      
    }
      let real;
      try{
        real = await client.users.fetch(inviter.id);
      } catch(err) { throw err; }
    
      if(inviter.fake == true){
         db.subtract(`serverData_${guild.id}.invites.${inviter.id}.sahte`, 1);
       } else if(inviter.fake == false) {
         db.subtract(`serverData_${guild.id}.invites.${inviter.id}.davet`, 1);
         db.add(`serverData_${guild.id}.invites.${inviter.id}.çıkan`, 1);
      }

       let normalInvites = db.fetch(`serverData_${guild.id}.invites.${inviter.id}.davet`) || 0;
       let fakeInvites = db.fetch(`serverData_${guild.id}.invites.${inviter.id}.sahte`) || 0;
       let bonusInvites = db.fetch(`serverData_${guild.id}.invites.${inviter.id}.bonus`) || 0;
       let regularInvites = db.fetch(`serverData_${guild.id}.invites.${inviter.id}.regular`) || 0;
       let totalInvites = (normalInvites + bonusInvites + regularInvites); 

       let messageSucces;
       if(leaveMessages) messageSucces = leaveMessages.replace("{user_name}", member.user.username).replace("{user_tag}", member.user.tag).replace("{user_id}", member.id).replace("{user}", member).replace("{user_day}", moment.duration(memberDay).format('D')).replace("{user_history}", moment(member.user.createdAt).format('DD-MM-YYYY')).replace("{inviter_name}", real.username || "@delete-user").replace("{inviter_tag}", real.tag || "@delete-user").replace("{inviter_id}", inviter.id || "@delete-user").replace("{inviter}", real || "@delete-user").replace("{inviter_invite}", totalInvites).replace("{inviter_sahte}", fakeInvites).replace("{server_number}", member.guild.memberCount).replace("{server_name}", member.guild.name).replace("{invite_code}", "Yakında!").replace("{invite_usage}", "Yakında!") 
       if(!leaveMessages) messageSucces =  `\`${member.user.tag}\` Leaves! Inviting By: **${real.username || "@delete-user"}** (**${totalInvites}** Invites!)`
       if(guild.channels.cache.get(channel)) guild.channels.cache.get(channel).send(messageSucces)
      let inviteUser = member.guild.members.cache.get(inviter.id)
    
  } else {
    if(guild.channels.cache.get(channel)) return guild.channels.cache.get(channel).send(`\`${member.user.tag}\` Leaves, I couldn't understand how you joined!`)
  }
}) 






////////


  

client.login(settings.token)

