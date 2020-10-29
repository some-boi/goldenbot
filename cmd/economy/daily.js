const { RichEmbed } = require("discord.js")

module.exports = {
  name:"daily",
  module:"economy",
  cooldown:86400,
  execute: (client, message, args) => {
    const num1 = 400
    const e = new RichEmbed().setTitle("daily command:")
    .setDescription("you just got your daily 400 coins, come back after 24 hours")
    .setTimestamp()
    message.channel.send(e)
    if (!client.economy.has(`${message.guild.id}.${message.member.id}`)) {
      client.economy.set(message.guild.id + "." + message.member.id, { cash: 0, bank: 0 })
    }
    if (client.economy.has(`${message.guild.id}.${message.member.id}`)) {
      client.economy.add(`${message.guild.id}.${message.member.id}.cash`, num1)
    }
  }
}