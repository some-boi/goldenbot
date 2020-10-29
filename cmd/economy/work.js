const { RichEmbed } = require("discord.js")

module.exports = {
  name:"work",
  module:"economy",
  cooldown:60,
  execute: (client, message, args) => {
    let num = Math.floor(Math.random() * 301)
    let num1 = 0
    for (let i in client.shop.get(message.guild.id)) {
      if (message.member.roles.cache.find(m => m.id == client.shop.get(message.guild.id + "." + i + ".role")) && client.shop.has(message.guild.id + "." + i + ".multiplier")) {
        num1 = num * client.shop.get(message.guild.id + "." + i + ".multiplier")
        num = num1
      }
    }
    const list = [`your boss gave u ${num} for not being lazy for once`, `you neighbor gave u ${num} for helping him`, `your mom gave u ${num} for doing your chores and doing your homework`]
    const num2 = Math.floor(Math.random() * (list.length))
    const msg = list[num2]
    const e = new RichEmbed().setTitle("work command:")
    .setDescription(msg)
    .setTimestamp()
    message.channel.send(e)
    if (!client.economy.has(`${message.guild.id}.${message.member.id}`)) {
      client.economy.set(message.guild.id + "." + message.member.id, { cash: 0, bank: 0 })
    }
    if (client.economy.has(`${message.guild.id}.${message.member.id}`)) {
      client.economy.add(`${message.guild.id}.${message.member.id}.cash`, num)
    }
  }
}