module.exports = {
  name:"logchannel",
  aliases: ["logc", "lc", "lchannel", "logch", "lch"],
  module: "config",
  usage:"[channel mention/name/id]",
  description: "a channel where every log is stored",
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
        client.config.set(`${message.guild.id}`, { logs: ch.id});
      }
    if (!client.config.has(message.guild.id + ".logs")) {
      client.config.set(`${message.guild.id}.logs`, ch.id)
    }
    if(client.config.has(message.guild.id + ".logs")) {
      client.config.delete(message.guild.id + ".logs")
      client.config.set(`${message.guild.id}.logs`, ch.id)
    }
    message.channel.send(`logs channel is now set to <#${ch.id}>`)
  }
}