const {RichEmbed} = require("discord.js")

module.exports = {
	name: 'unmute',
	description: 'unmute a bad boi',
	usage: '[mention]',
  module: "mod",
  permission: ["MANAGE_ROLES"],
  execute: (client, message, args) => {
      let member = message.mentions.members.first()
      if(!member) {
        member = message.guild.members.cache.find(m => m.id == args[0] || m.user.username == args[0])
        if(!member) {
          message.reply("i aint u unmuting u lol")
        }
      }
    const bot = message.guild.members.cache.find(e => e.id == 481489864626536458)
    if(!bot.permissions.has("MANAGE_ROLES")) return message.channel.send("i dont have permissions")
    const role = message.guild.roles.cache.find(m => m.id == client.config.get(message.guild.id + ".role"))
    const id = role.id
    if (!role) return message.reply("that member not muted")
    member.removeRoles(id)
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    if (!ch) return
    const e = new RichEmbed().setTitle("a member got muted:")
    .addField("member:", member.tag)
    .addField("by:", message.author.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)
    message.channel.send("member unmuted successfuly")
  }
}