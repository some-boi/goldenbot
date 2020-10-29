const { Util, RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');


module.exports = {
	name: 'kick',
	description: 'kick a bad boi',
	usage: '[mention] [reason]',
  module: "mod",

  permission: ["KICK_MEMBERS"],
  execute: (client, message, args) => {
      let user = message.mentions.members.first()
      if(!user) {
        user = message.guild.members.cache.find(m => m.id == args[0] || m.username.startsWith(args[0]))
        if(!user) {
          return message.reply("thats not a valid member")
        }
      }
    if (user == message.author) {
      return message.reply("u cant kick urself")
    }
    const bot = message.guild.members.cache.find(e => e.id == 481489864626536458)
    if(!bot.permissions.has("KICK_MEMBERS")) return message.channel.send("i dont have permissions")
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("according to role hierarchy i cannot use this action on that member because he has a higher rank than you")
    if (bot.roles.highest.position <= user.roles.highest.position) return message.channel.send("my role isnt high enough to perform this action on this member")
    let arg = args.join.replace(user, "")
    user.ban(arg)
    user.send(`you got kicked by ${message.author.username} for ${arg}`)
    message.channel.send(`kicked ${user} for ${arg}`)
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    const e = new RichEmbed().setTitle("a member got kicked:")
    .addField("member:", user.tag)
    .addField("by:", message.author.tag)
    .addField("reason:", arg)
    .setColor("GOLD")
    .setTimestamp()
    if (!ch) return
    ch.send(e)   
  }
}