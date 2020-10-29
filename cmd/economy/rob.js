const { RichEmbed } = require("discord.js")

module.exports = {
  name:"rob",
  module:"economy",
  cooldown:120,
  execute: (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      user = message.client.users.cache.find(m => m.id == args[0])
      if(!user) {
        return message.reply("u just tried robbing yourself, you failed, now u have to wait for 2 hours to regain ur energy and tools")
      }
    }
    if (!client.economy.has(`${message.guild.id}.${user.id}`)) {
      client.economy.set(message.guild.id + "." + user.id, { cash: 0, bank: 0 })
    }
    if (client.economy.get(message.guild.id + "." + user.id + ".cash") === 0) {
      return message.reply("you succeeded in breaking in, but you realised that he has no cash, now u have to wait for 2 hours from trying to steal a poor person (or is he?)")
    }
    const rob = Math.floor(Math.random() * (client.economy.get(`${message.guild.id}.${user.id}.cash`)/2 + 1))
    const chance = Math.floor(Math.random() * 101)
    if (chance <= 50) {
      const e = new RichEmbed().setTitle("rob command:")
      .setDescription("you failed to rob " + user.username + ", now you have to wait for 2 hours to regain ur stamina and tools for another rob")
      .setTimestamp()
      message.channel.send(e)
    }
    if (chance > 50) {
      const e = new RichEmbed().setTitle("rob command:")
      .setDescription("you successfuly robbed " + rob + "from that guy")
      .setTimestamp()
      message.channel.send(e)
    }
  }
}