module.exports = {
  name:"prefix",
  module:"config",
  usage:"<prefix>/default",
  description: "if you dont like the current prefix or too many bots have it you can change it with this command",
  permission: ["MANAGE_GUILD"],
  execute: (client, message, args) => {
    const arg= args.join(" ")

    if (!arg) return message.reply("theres no prefix to add")
    if (arg == "default") {
      if (client.config.has(message.guild.id + ".prefix")) {
        client.config.delete(message.guild.id + ".prefix")
        return message.channel.send("now its back to the default prefix (e!)")
      }
      if (!client.config.has(message.guild.id + ".prefix")) {
        return message.reply("its already at the default prefix m8")
      }
    } // hey ur little shit c:, btw... WHAT THE FUCK ARE YOU DOING AT THIS SHIT...
    if (arg.length > 5) {
      return message.reply("the prefix cant have more than 5 letters")
    }
    if (!client.config.has(message.guild.id)) {
      client.config.set(message.guild.id, { prefix: arg })
      return message.channel.send(`now the prefix is ${arg}`)
    }
    if (!client.config.has(message.guild.id + ".prefix")) {
      client.config.set(message.guild.id + ".prefix", arg )
      return message.channel.send(`now the prefix is ${arg}`)
    }
    client.config.delete(message.guild.id + ".prefix")
    client.config.set(message.guild.id + ".prefix", arg )
    return message.channel.send(`now the prefix is ${arg}`)    
  }
}