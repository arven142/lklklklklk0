const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment');
require('moment-duration-format');
module.exports = { 	
  enabled: true,
  aliases: [],
  name: 'ping',
  description:"Shows the Bot's Values.",
  category:"Bilgi",
  usage:"ping",
  run: async(client, message, args, setting) => {

 message.channel.send("Getting Value!").then(s => {
    s.edit(`Bot Ping: ${Math.round(client.ws.ping)}\nMessage Ping: ${Math.round(Date.now() - s.createdTimestamp)}`)
})
  }
};