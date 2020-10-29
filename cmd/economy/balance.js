const { RichEmbed } = require("discord.js")

module.exports = {
  name:"balance",
  aliases: ["bal", "money", "cash"],
  module:'economy',
  usage: "optional: [member]",
  execute: (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      user = message.client.users.cache.find(m => m.id == args[0] || m.username == args.join(" "))
      if(!user) {
        user = message.author
      }
    }
    if (!client.economy.has(`${message.guild.id}.${user.id}`)) {
      client.economy.set(message.guild.id + "." + user.id, { cash: 0, bank: 0 })
    }
    if (client.economy.has(`${message.guild.id}.${user.id}`)) {
      const e = new RichEmbed().setAuthor(user.username, user.avatarURL({dynamic: true}))
      .setTitle(`💰 ${user.username} balance:`)
      .addField("cash:", client.economy.get(`${message.guild.id}.${user.id}.cash`))
      .addField("bank:", client.economy.get(`${message.guild.id}.${user.id}.bank`))
      .addField("total:", client.economy.get(`${message.guild.id}.${user.id}.cash`) + client.economy.get(`${message.guild.id}.${user.id}.bank`))
      message.channel.send(e)
    }
  }
}