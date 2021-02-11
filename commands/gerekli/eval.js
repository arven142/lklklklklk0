const bayrakk = require('discord.js')
const util = require('util');
const tokenuyari = `Token Protection :) `
const db = require('quick.db');

module.exports = { 	
  enabled: true,
  aliases: ["eval"],
  name: 'eval',
  description:"Adds an amount of invitation to the person you specified.",
  usage:"davet-ekle <@kullanıcı> <miktar>",
  
  run: async(client, message, args, setting, prefix) => {

  let bayrak = message
if(bayrak.author.id !== '751064870547357818') return;
	if(!args[0]) {
		const embed = new bayrakk.MessageEmbed()
			.setDescription(`Write code!`)
			.setColor("1a38f6")
			.setTimestamp()
		bayrak.channel.send({embed})
		return
	}
	const code = args.join(' ');
	if(code.match(/(client.token)/g)) {
		const newEmbed = new bayrakk.MessageEmbed()
			.addField('Error', `\`\`\`xl\n${tokenuyari}\`\`\``)
			.setColor('#FF0000');
		bayrak.channel.send(newEmbed);
		return
	}

	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};

	const evalEmbed = new bayrakk.MessageEmbed().setColor('30be3f')
	try {
		var evaled = clean(await eval(code));
		if(evaled.startsWith('NTQ3M')) evaled = tokenuyari;
		if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
		else evalEmbed.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
		const newEmbed = bayrakk.MessageEmbed()
			.addField('📥 Code', `\`\`\`javascript\n${code}\n\`\`\``)
			.addField('📤 Result', `\`\`\`js\n${evaled}\`\`\``)
			.setColor('30be3f')
		bayrak.channel.send(newEmbed);
	}
	catch (err) {
		evalEmbed.addField('Error', `\`\`\`js\n${err}\n\`\`\``);
		evalEmbed.setColor('#FF0000');
		bayrak.channel.send(evalEmbed);
	}
}
}
