module.exports = {
  name: "suggestionchannel",
  module: "config",
  aliases: ["sch", "suggestionch", "schannel"],
  usage: "[channel id/mention/name]",
  description: "will make people be able suggest some stuff",
  permission: ["MANAGE_CHANNELS"],
  execute: (client, message, args) => {
      let ch = message.mentions.channels.first()
      if(!ch) {
        ch = message.guild.channels.cache.find(m => m.id == args[0] || m.name == args[0])
        if(!ch) {
          return message.channel.send("thats not a valid channel")
        }
      }
      if (!client.config.has(message.guild.id)){
        client.config.set(`${message.guild.id}`, { suggestion: ch.id});
      }
    if (!client.config.has(message.guild.id + ".suggestion")) {
      client.config.set(`${message.guild.id}.suggestion`, ch.id)
    }
    if(client.config.has(message.guild.id + ".suggestion")) {
      client.config.delete(message.guild.id + ".suggestion")
      client.config.set(`${message.guild.id}.suggestion`, ch.id)
    }
    message.channel.send(`suggestion channel is now set to <#${ch.id}>`)}
  
}