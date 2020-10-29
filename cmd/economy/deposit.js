const { RichEmbed } = require("discord.js")

module.exports = {
  name:"deposit",
  aliases:["dep"],
  usage: '<amount> (it can also be "all")',
  module:"economy",
  execute: (client, message, args) => {
    let amount = args[0]
    if (amount == "all") {
      amount = client.economy.get(`${message.guild.id}.${message.member.id}.cash`)
    }
    if (client.economy.get(`${message.guild.id}.${message.member.id}.cash`) == 0) return message.channel.send("you dont have any cash in your hand")
    if (isNaN(amount)) {
      return message.reply("that aint a number m8")
    }
    if (amount < 0) return message.channel.send("you cant deposit negative values")
    if (amount > client.economy.get(`${message.guild.id}.${message.member.id}.cash`)) return message.reply("U DONT HAVE DAT MACH CAWSH WUT U THINKIN M8")
    client.economy.subtract(`${message.guild.id}.${message.member.id}.cash`, amount)
    client.economy.add(`${message.guild.id}.${message.member.id}.bank`, amount)
    message.channel.send("you deposited " + amount + " to your bank now its safe (jk dont trust banks mate)")
  }
}