const {RichEmbed} = require("discord.js")

module.exports = {
  name:"unlock",
  module:"mod",
  description: 'unlock a channel using this',
  permission: ["MANAGE_CHANNELS"],
  execute: (client, message, args) => {
    const role = message.guild.roles.cache.find(m => m.name == "@everyone")
    const bot = message.guild.members.cache.find(e => e.id == 481489864626536458)
    if(!bot.permissions.has("MANAGE_CHANNELS")) return message.channel.send("i dont have permissions")
    const perms = message.channel.permissionsFor(role);
    if (perms.has("SEND_MESSAGES")) return message.channel.send("its already unlocked")
    message.channel.overwritePermissions(role, {SEND_MESSAGES: true})
    message.channel.send("channel unlocked successfuly")
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    if (!ch) return
    const e = new RichEmbed().setTitle("a channel got unlocked:")
    .addField("channel:", message.channel.name)
    .addField("by:", message.author.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)
  }
}