const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment')
module.exports = { 	 
  enabled: true,
  aliases: [],
  name: 'membersinfo',
  description:"Shows Information About the User.",
  category:"Bilgi",
  usage:"kullanıcı-bilgi",
  run: async(client, message, args, setting) => {

  let kişi = message.mentions.users.first() || message.author;

  let sırala = message.guild.members.cache.array().sort((a,b) => a.joinedTimestamp - b.joinedTimestamp);
  let enüst = message.guild.members.cache.filter(s => s.name !== '@everyone').get(kişi.id).roles.highest;
  let sıra = `${sırala.map(e => e.id).indexOf(kişi.id) +1}/${message.guild.memberCount}`
  let rollersayı = message.guild.member(kişi.id).roles.cache.filter(s => s.name !== '@everyone').size || "0"
  let roller = message.guild.member(kişi).roles.cache.filter(s => s.name !== '@everyone').sort((a, b) => b.position - a.position).map(m => m).join(',') || "No Role Available!"
  var Durum = kişi.presence.status;
  var durm = (Durum == "online" ? (`${client.emojis.cache.get("")} [Online]`) : (Durum == "offline" ? (`${client.emojis.cache.get("")} [Offline]`) : (Durum == "idle" ? (`${client.emojis.cache.get("")} [Idle]`) : (Durum == "dnd" ? (`${client.emojis.cache.get("") } [DND]`) : (`${client.emojis.cache.get("")} [Unkown!]`)))));
  
  // üste emoji id leri girersin test için yaptım!
	var bağlantıDurum;
   	if (kişi.presence.clientStatus) {
      if (kişi.presence.clientStatus.mobile) bağlantıDurum = 'Mobile :iphone:'
      if (kişi.presence.clientStatus.desktop) bağlantıDurum = 'Computer :computer:'
      if (kişi.presence.clientStatus.web) bağlantıDurum = 'Web :globe_with_meridians: '
		}


   let veri = db.fetch(`serverData_${message.guild.id}.inviter.${kişi.id}`);

   const embed = new Discord.MessageEmbed()
  .setColor(setting.color)
  .setThumbnail(kişi.avatarURL({dynamic:true}))
  .setTitle(`${kişi.tag}`)
  .setDescription(`**__User İnformation__** \n▫️ **Person Order:** ${sıra}\n▫️ **Inviting:** ${veri ?  client.users.cache.get(veri.id) :  "Unknown!"}\n▫️ **Top Role:** ${enüst}\n▫️ **Profile Status:** ${durm}\n▫️ **Connection Status:** ${bağlantıDurum || "Off"}`)
  .addField(`**Roles [${rollersayı}]**`,`${roller}`)
  .setFooter(`${kişi.id}`, kişi.avatarURL({dynamic:true}))
  .setTimestamp()
  message.channel.send(embed)
 }
};
