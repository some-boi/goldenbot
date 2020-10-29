const { RichEmbed } = require("discord.js")

module.exports = {
  name:"suggest",
  description: "suggest something for the server using this command",
  usage:"<suggestion>",
  module: "utility",
  execute: (client, message, args) => {
    const suggestion = message.content.replace(client.config.get(message.guild.id + ".prefix") + "suggest ", "").replace("e!suggest ", "")
    if (!client.config.has(message.guild.id + ".suggestion")) return message.channel.send("suggestion channel is still not set mate")
    const channel = message.guild.channels.cache.find(m => m.id == client.config.get(message.guild.id + ".suggestion"))
    const emote1 = message.guild.emojis.cache.find(m => m.id == "arrow_down")
    const emote2 = message.guild.emojis.cache.find(m => m.name == "arrow_up")
    const e = new RichEmbed().setTitle(message.author.tag + "'s suggestion:")
    .setAuthor(message.author.id, message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription(suggestion)
    .setColor("RANDOM")
    channel.send(e).then(msg => {
      msg.react("⬆️").then(() => msg.react("⬇️"))
    })
  }
}