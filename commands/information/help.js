const Discord = require("discord.js");
module.exports = { 	
  enabled: true,
  aliases: ["y"],
  name: 'help',
  description:"Help Menu",
  category:"Bilgi",
  usage:"yardım <komut>",
  run: async(client, message, args, setting, prefix) => {

       


  let komut = args[0]

   let cmd;
  if (client.commands.has(komut)) {
    cmd = client.commands.get(komut);
  } else if (client.aliases.has(komut)) {
    cmd = client.commands.get(client.aliases.get(komut));
  }
   
if(cmd){
    let seç;
  if(cmd.aliases.length < 1) seç = cmd.name
  if(cmd.aliases.length >= 1) seç = `${cmd.aliases + ","}${cmd.name}`
  
 const embed = new Discord.MessageEmbed()
 .setColor(setting.color)
 .setTitle("Command Help")
 .addField("**Explanation**",`${cmd.description || "Not set!"}`)
 .addField("**Usage**", `\`${prefix}${cmd.name}\``)
 .addField("**Usage Shapes**",seç)
 .setFooter(client.user.username, client.user.displayAvatarURL())
 .setTimestamp()
 message.channel.send(embed)
          
 } else if (!cmd){
   const komut = []
     client.commands.forEach((command) => {
			const category = command.category;
			 if (!komut.hasOwnProperty(category)) komut[category] = [];
			 komut[category].push({name: command.name, description: command.description});
		})
   const talkedRecently = new Set();
   const embed = new Discord.MessageEmbed()
   .setColor(setting.color)
   .setAuthor("Ghost Trakcer's Help Page")
   .setDescription(`Ghost Tracker is a powerful bot which will manage your discord server's invites. \n \n Go to the **vote** by clicking [here](https://top.gg/bot/776471578586120213/vote) \n  Go to the **add me server** by clicking [here](http://gg.gg/invitecontroller)`) 
  // .addField("📨 Administration", komut["Davet Sistemi"].map(s => `\`${prefix}${s.name}\``).join(', '))
   .addField('⚙️ Administration' , '`\`addbonus`\`, `\`removebonus`\`, `\`resetinvites`\`,`\`resetchannels`\`, `\`resetmessages`\`, `\`serverdataremove`\`')
   .addField("📊 General",komut["Bilgi"].map(s => `\`${s.name}\``).join(', '))
   .addField("🔨 Configuration",komut["Sunucu Ayarları"].map(s => `\`${s.name}\``).join(', '))
   .addField("⚒ Moderation",komut["moderation"].map(s => `\`${s.name}\``).join(', '))
  .setFooter("Use !help [command] for more info on a command." , client.user.avatarURL())
   message.react('<a:baarl:759391724585353218> ')
   message.channel.send(embed)
 }
  }
};

 