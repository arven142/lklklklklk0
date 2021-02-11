const Discord = require('discord.js');
const qdb = require('quick.db');
const ms = require("ms");


module.exports = { 	
  enabled: true,
  aliases: ["un-mute"],
  name: 'unmute',
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
if (!kisi) return message.reply(new Discord.MessageEmbed().setDescription("Tag a user to unmute"));

 if(!kisi.roles.cache.find(r => r.id === muterole2.id)) return message.reply("The Person Has Not Been Silenced Before!")

 
var reason = args.slice(1).join(" ")

if(reason){
    await kisi.roles.remove(muterole2.id);
    message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} Unmuted!\nReason: **${reason}**\nAuthorized: **${message.author}**`));
} else {
    await kisi.roles.remove(muterole2.id);
    message.channel.send(new Discord.MessageEmbed().setDescription(`${kisi} Unmuted!\nAuthorized: **${message.author}**`));
};
  }

};