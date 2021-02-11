const Discord = require('discord.js');
const qdb = require('quick.db');
const ms = require("ms");


module.exports = { 	
  enabled: true,
  aliases: ["mute"],
  name: 'mute',
  category: 'moderation',  
  description:"Shows Information About the Server.",
  run: async(client, message, args, setting) => { 
 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Not Proficient Enough To Use This Command!", "https://cdn.discordapp.com/emojis/756613093530009841.png?v=1"))


var muterole1 = qdb.fetch(`muteroluid_${message.guild.id}`);
var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
if (!muterole2) {
    try {
   
     muterole2 = await message.guild.roles.create({ 
            data: {
                name: "Muted",
                color: "#5f6161",
                permissions: []
              },
            reason: 'Mute Roles!' 
            })

        qdb.set(`muteroluid_${message.guild.id}`, muterole2.id);

        message.guild.channels.cache.forEach(async (channel) => {
            await channel.createOverwrite(muterole2, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false
              });
          });

} catch (err) {
    console.log(err);
}

};

var kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!kisi) return message.channel.send(new Discord.MessageEmbed().setColor(setting.color).setAuthor("Tag a user to mute"));

var time = args[1];
var reason = args.slice(2).join(" ")

if (!time) {
    if(reason){
        await kisi.roles.add(muterole2.id);
        message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} **Unlimited** Silence Muted!\nReason: **${reason}**\nAuthorized: **${message.author}**`));
    } else {
        await kisi.roles.add(muterole2.id);
        message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} **Unlimited** Silence Muted!\nAuthorized: **${message.author}**`));
    };

} else {
    
    if(reason){
        await kisi.roles.add(muterole2.id);
        message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} **${time}** Silenced Way Muted!!\nReason: **${reason}**\nAuthorized: **${message.author}**`));
       
       
           setTimeout(function() {
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                kisi.roles.remove(muterole2.id)
              message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} Mute removed due to silencing time expired`));
            }
           }, ms(time));

    } else {
        await kisi.roles.add(muterole2.id);
        message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} **${time}** Silenced Way Muted!\nAuthorized: **${message.author}**`));

        setTimeout(function() {
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                kisi.roles.remove(muterole2.id)
              message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} Mute removed due to silencing time expired`))
            }
           }, ms(time));
    }
};

  }

};