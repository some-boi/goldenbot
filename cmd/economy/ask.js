const {RichEmbed} = require("discord.js")

module.exports = {
  name:"ask",
  module:"economy",
  cooldown: 600,
  execute: (client, message, args) => {
    const amount = Math.floor(Math.random() * 401)
    const stuff = ["you asked your grandmother with alzeihmer for some cash and she gave you " + amount + "$", "you asked your mom for your pocket money and she gave you " + amount + "$", "you asked some random guy in the street after he felt generous he gave you " + amount + "$", "you asked your girlfriend for some cash and she gave you " + amount + "$"]
    const stuff2 = ["you asked your grandma with alzeihmer but she didn't forget that she gave you alot of cash before and you got a slap instead", "you asked your mother for pocket money but she said that you didn't finish your chores and homework so you got grounded instead", "you asked some guy in the street for some change but he decided to ignore", "you asked your girlfriend for some cash but she made an execuse of buying more make up even if she has 4 full boxes"]
    const chance = Math.floor(Math.random() * 101)
    if (chance < 25) {
      const shit = stuff2[Math.floor(Math.random() * stuff2.length)]
      return message.channel.send(shit)
    }
    if (chance >= 25) {
      const shit = stuff[Math.floor(Math.random() * stuff.length)]
      message.channel.send(shit)
      if (!client.economy.has(`${message.guild.id}.${message.member.id}`)) {
        client.economy.set(message.guild.id + "." + message.member.id, { cash: 0, bank: 0 })
      }
      return client.economy.add(`${message.guild.id}.${message.member.id}.cash`, amount)
    }
  }
}