const {RichEmbed} = require("discord.js")
module.exports = {
  name: 'mute',
  description: 'mute someone boi',
  usage: '[mention someone] [duration]',
  module: "mod",
  permission: ["MANAGE_ROLES"],
  execute: (client, message, args) => {  
    const time = args[1]
    const shit = args[0]
    if(!args[0]) return message.channel.send("Input an user to mute.")
      let member = message.mentions.members.first()
      if(!member) {
        member = message.guild.members.cache.find(m => m.id == args[0] || m.username == args[0])
        if(!member) {
          return message.reply("thats not a valid member")
        }
      }
    if (!client.mute.has(message.guild.id)) {
      
    }
    if (member == message.author) {
      return message.reply("u cant kick urself")
    }
    const bot = message.guild.members.cache.find(e => e.id == 481489864626536458)
    if(!bot.hasPermission("MANAGE_ROLES")) return message.channel.send("i dont have permissions")
    const user = message.guild.members.find(e =>e.id == member.id) 
    let arr;
    let role = message.guild.roles.find(m => m.id == client.config.get(message.guild.id + ".role"))
    if (!role) role = message.guild.roles.cache.find(m => m.name == "muted")
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("according to role hierarchy i cannot use this action on that member because he has a higher rank than you")
    if (bot.roles.highest.position <= role.position) return message.channel.send("my role isnt high enough to perform this action on this member")
    const id = role.id
    if (user.roles.cache.get(e => e.id = id)) return message.reply("that member is already muted")
    if (!time) {
      member.roles.add(id)
      arr = "no limit"
      const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
      if (!ch) return
      const e = new RichEmbed().setTitle("a member got muted:")
      .addField("member:", member.name)
      .addField("limit:", arr)
      .addField("by:", message.author.tag)
      .setColor("GOLD")
      .setTimestamp()
      try {ch.send(e)} catch (error) {console.log()}
      return message.channel.send("member muted successfuly")
    }
    if (!isNaN(time)) {
      var seconds = Math.floor(time * 1000)
      s = time + " seconds"
      if (isNaN(seconds)) {
        return message.reply("that aint no number m8")
      } else {
      user.roles.add(id)
      client.setTimeout(() => member.roles.remove(id), seconds)
      }
      
    } 
    if (time.endsWith('s')) {
      var s = time.replace("s", "")
      arr =  s + " seconds"
      var seconds = Math.floor(s * 1000)
      if (isNaN(seconds)) {
        return message.reply("that aint no number m8")
      } else {
        user.addRoles(id)
        client.setTimeout(() => member.roles.remove(id), seconds).catch(() => message.channel.send(""))
      }
      
      
    } 
    if (time.endsWith('m')) {
      var s = time.replace("m", "")
      arr = s + " minutes"
      var seconds = Math.floor(s * 1000 * 60)
      if (isNaN(seconds)) {
        return message.reply("that aint no number m8")
      } else {
        user.roles.add(id)
        client.setTimeout(() => member.roles.remove(id), seconds)
      }
    }
    if (time.endsWith('h')) {
      var s = time.replace("h", "")
      arr = s + " hours"
      var seconds = Math.floor(s * 1000 * 60 * 60)
      if (isNaN(seconds)) {
        return message.reply("that aint no number m8")
      } else {
        user.roles.add(id)
        client.setTimeout(() => member.roles.remove(id), seconds)

      }

    } 
    if (time.endsWith('d')) {
      var s = time.replace("d", "")
      arr = s + " days"
      var seconds = Math.floor(s * 1000 * 60 * 60 * 24)
      if (isNaN(seconds)) {
        return message.reply("that aint no number m8")
      } else {
        user.roles.add(id)
        client.setTimeout(() => member.roles.remove(id), seconds)

      }

    }
    const ch  = message.guild.channels.cache.find(e => e.id == client.config.get(message.guild.id + ".logs"))
    if (!ch) return
    const e = new RichEmbed().setTitle("a member got muted:")
    .addField("member:", member.tag)
    .addField("limit:", arr)
    .addField("by:", message.author.tag)
    .setColor("GOLD")
    .setTimestamp()
    try {ch.send(e)} catch(error) {console.log()} 
    message.channel.send("member muted successfuly")
  }
}