const { Util } = require('discord.js');
const {RichEmbed} = require("discord.js")

module.exports = {
	name: 'ban',
	description: 'use that thick ban hammer the bot has',
	usage: '[mention] [reason]',
  module: "mod",
  permission: ["BAN_MEMBERS"],
  execute: (client, message, args) => {
      let user = message.mentions.members.first()
      if(!user) {
        user = message.guild.members.cache.find(m => m.id == args[0] || m.user.username == args[0])
        if(!user) {
          return message.reply("thats not a valid member")
        }
      }
    if (user == message.author) {
      return message.reply("u cant kick urself")
    }
    const bot = message.guild.members.cache.find(e => e.id == 481489864626536458)
    if(!bot.permissions.has("BAN_MEMBERS")) return message.channel.send("i dont have permissions")
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("according to role hierarchy i cannot use this action on that member because he has a higher rank than you")
    if (bot.roles.highest.position <= user.roles.highest.position) return message.channel.send("my role isnt high enough to perform this action on this member")
    if (!client.config.has(message.guild.id + ".logs")) return
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    let arg = args.join(" ").replace(user, "")
    user.ban(arg)
    user.send(`you got banned by ${message.author.username} for ${arg}`)
    message.channel.send(`banned ${user} for ${arg}`)
    if (!ch) return
    const e = new RichEmbed().setTitle("a member got banned:")
    .addField("member:", user.tag)
    .addField("by:", message.author.tag)
    .addField("reason:", arg)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)    
  }
}