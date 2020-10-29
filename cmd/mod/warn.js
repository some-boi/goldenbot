const {RichEmbed} = require("discord.js")

module.exports = {
  name:'warn',
  aliases:["w"],
  module:"mod",
  usage:"<member> <reason>",
  permission: ["MANAGE_ROLES"],
  description:"warn someone if they did smth bad",
  execute:(client, message, args) => {
      let user = message.mentions.members.first()
      if(!user) {
        user = message.guild.members.cache.find(m => m.id == args[0] || m.user.username == args[0])
        if(!user) {
          return message.reply("thats not a valid member")
        }
      }
    let count;
    if (user == message.author) {
      return message.reply("u cant warn urself")
    }
    let role = message.guild.roles.cache.find(m => m.id == client.config.get(message.guild.id + ".role"))
    if (!role) {
      role = message.guild.roles.cache.find(m => m.name == "muted")
      if (!role) return
    }
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("according to role hierarchy i cannot use this action on that member because he has a higher rank than you")
    if (bot.roles.highest.position <= user.roles.highest.position || bot.roles.highest.position <= role.postion) return message.channel.send("my role isnt high enough to perform this action on this member")
    let reason = args.join(" ").replace(args[0], "")
    if (!reason) reason = "no reason"
    message.channel.send(user.user.tag + " was warned for:\n" + reason)
    if (!client.warn.has(message.guild.id + "." + user.id)) {client.warn.set(message.guild.id + "." + user.id, {warns: 1})} else {
      client.warn.add(message.guild.id + "." + user.id + ".warns", 1)
      count = client.warn.get(message.guild.id + "." + user.id + ".warns")
      if (client.warn.get(message.guild.id + "." + user.id + ".warns") == 3) {
        message.channel.send(user.user.tag + " got muted for 1 hour for reaching 3 warns");
        user.roles.add(role); 
        client.warn.delete(message.guild.id + "." + user.id)
        client.setTimeout(() => user.roles.remove(role), 3600)
        const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
        if (!ch) return
    const e = new RichEmbed().setTitle("a member got muted:")
    .addField("member:", user.user.tag)
    .addField("limit:", "1h")
    .addField("by:", "warn limit")
    .setColor("GOLD")
    .setTimestamp()       
    try {ch.send(e)} catch(error) {throw error}
      }
    }
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    if (!ch) return
    const e = new RichEmbed().setTitle("a member got warned:")
    .addField("member:", user.user.tag)
    .addField("by:", message.author.tag)
    .addField("reason:", reason)
    .addField("warn count:", !client.warn.get(message.guild.id + "." + user.id + ".warns") ? "3" : client.warn.get(message.guild.id + "." + user.id + ".warns"))
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e) 
  }
}