module.exports = {
  name: "mutedrole",
  aliases: ["mrole", "mutedr", "mr"],
  module:"config",
  usage:"<set> [role]/<delete>/<create> [name]",
  description: "this will make the bot set the role to give when muting someone",
  permission: ["MANAGE_ROLES"],
  execute: (client, message, args) => {
    const arg = args[0]
    if (arg === "set") {
      const r = args.join(" ").replace("arg ", "")
      let role = message.mentions.roles.first()
      if (!role) {
          message.guild.roles.cache.find(m => m.name == r.replace(arg + " ", "") || m.id == r.replace(arg + " ", ""))
          if (!role) return message.channel.send("thats not a valid role")
      }
      message.channel.send("muted role has been set to " + role.name)
      if (!client.config.has(message.guild.id)) return client.config.set(message.guild.id, { role: role.id })
      if (!client.config.has(message.guild.id + ".role")) return client.config.set(message.guild.id + ".role", role.id)
      client.config.delete(message.guild.id + ".role")
      client.config.set(message.guild.id + ".role", role.id)
    }
    if (arg == "create") {
      const r = args.join(" ").replace("arg ", "")
      
      if (message.guild.roles.cache.find(m => m.name == r)) return message.reply("theres already a role with that name wut u doing man")
      message.guild.roles.create({name: r.replace(arg + " ", ""), permissions: 0})
      .then(role => {
        for (let channel in message.guild.channels.cache) {
          channel.overwritePermissions(role, {SEND_MESSAGES: false})
        }
      message.channel.send("successfuly created and set to " + role.name)
      if (!client.config.has(message.guild.id)) return client.config.set(message.guild.id, { role: role.id })
      if (!client.config.has(message.guild.id + ".role")) return client.config.set(message.guild.id + ".role", role.id)
      client.config.delete(message.guild.id + ".role")
      client.config.set(message.guild.id + ".role", role.id)        
      })
    }
    if (arg == "delete") {
      if (!client.config.has(message.guild.id) || !client.config.has(message.guild.id + ".role")) return message.reply("you didnt set the muted role for me to remove")
      const role = message.guild.roles.cache.find(m => m.id == client.config.get(message.guild.id + ".role"))
      client.config.delete(message.guild.id + ".role")
      message.channel.send("the muted role had been successfuly removed and wont be used when muting someone")
    }
  }
}