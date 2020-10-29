const { Util, RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');


module.exports = {
	name: 'clear',
  aliases: ["purge"],
	description: 'makes the bot delete a bunch of messages',
  usage: "[amount]",
  module: "mod",
  permission: ["MANAGE_MESSAGES"],
  execute: (client, message, args) => {
    var arg = args.join(" ")
    if (!arg) return message.channel.send("you didnt specify the amount of messages")
    const bot = message.guild.members.cache.find(e => e.id == client.user.id)
    if (!bot.hasPermission("MANAGE_MESSAGES")) return message.channel.send("i dont have permissions to clear this channel")
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    if (isNaN(arg)) return message.channel.send("it aint a number m8")
    message.channel.bulkDelete(arg * 1 + 1)
    message.channel.send(`cleared ${arg} messages`)
    .then(m => m.delete({timeout: 3000}))
    if (!ch) return
    const e = new RichEmbed().setTitle("a channel got cleared:")
    .addField("amount of messages:", arg)
    .addField("by:", message.author.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)  
  }
}