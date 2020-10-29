const {RichEmbed} = require("discord.js")

module.exports = {
  name: 'lock',
  description: 'lock a channel using this',
  usage: '[duration]',
  module: "mod",
  permission: ["MANAGE_CHANNELS"],
  execute: (client, message, args) => {
    const time = args[0]
    const role = message.guild.roles.cache.find(m => m.name == "@everyone")
    let arr;
    const bot = message.guild.members.cache.find(e => e.id == 481489864626536458)
    if(!bot.permissions.has("MANAGE_CHANNELS")) return message.channel.send("i dont have permissions")
    const perms = message.channel.permissionsFor(role);
    if (!perms.has("SEND_MESSAGES")) return message.channel.send("its already locked")
    if (!time) {
      message.channel.overwritePermissions(role, {SEND_MESSAGES: false})
      arr = "no limit"
      return message.channel.send("channel locked successfuly")
      const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
      if (!ch) return
      const e = new RichEmbed().setTitle("a channel got locked:")
      .addField("channel:", message.channel.name)
      .addField("limit:", arr)
      .addField("by:", message.author.tag)
      .setColor("GOLD")
      .setTimestamp()
      ch.send(e)
    }
    if (!isNaN(time)) {
      var seconds = Math.floor(time * 1000)
      if (isNaN(seconds)) {
        message.reply("that aint no number m8")
      } else {
      message.channel.overwritePermissions(role, {SEND_MESSAGES: false})
        client.setTimeout(() => message.channel.overwritePermissions(role, {SEND_MESSAGES: true}), seconds)
      }
      arr = time + "s"
    } 
    if (time.endsWith('s')) {
      var s = time.replace("s", "")
      var seconds = Math.floor(s * 1000)
      if (isNaN(seconds)) {
        message.reply("that aint no number m8")
      } else {
      message.channel.overwritePermissions(role, {SEND_MESSAGES: false})
        client.setTimeout(() => message.channel.overwritePermissions(role, {SEND_MESSAGES: true}), seconds)
      }
      arr = time
    } 
    if (time.endsWith('m')) {
      var s = time.replace("m", "")
      var seconds = Math.floor(s * 1000 * 60)
      if (isNaN(seconds)) {
        message.reply("that aint no number m8")
      } else {
      message.channel.overwritePermissions(role, {
      SEND_MESSAGES: false
      })
        client.setTimeout(() => message.channel.overwritePermissions(role, {SEND_MESSAGES: true}), seconds)
      }
      arr = time
    }
    if (time.endsWith('h')) {
      var s = time.replace("h", "")
      var seconds = Math.floor(s * 1000 * 60 * 60)
      if (isNaN(seconds)) {
        message.reply("that aint no number m8")
      } else {
      message.channel.overwritePermissions(role, {SEND_MESSAGES: false})
        client.setTimeout(() => message.channel.overwritePermissions(role, {SEND_MESSAGES: true}), seconds)
      }
      arr = time
    } 
    if (time.endsWith('d')) {
      var s = time.replace("d", "")
      var seconds = Math.floor(s * 1000 * 60 * 60 * 24)
      if (isNaN(seconds)) {
        message.reply("that aint no number m8")
      } else {
      message.channel.overwritePermissions(role, {SEND_MESSAGES: false})
        client.setTimeout(() => message.channel.overwritePermissions(role, {SEND_MESSAGES: true}), seconds)
      }
      arr = time
    }
    message.channel.send("channel locked successfuly")
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    if (!ch) return
    const e = new RichEmbed().setTitle("a channel got locked:")
    .addField("channel:", message.channel.name)
    .addField("limit:", arr)
    .addField("by:", message.author.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)
  }
}