const { RichEmbed } = require("discord.js")

module.exports = {
  name:"withdraw",
  aliases:["with"],
  usage: '<amount> (it can also be "all")',
  module:"economy",
  execute: (client, message, args) => {
    let amount = args[0]
    if (amount == "all") {
      amount = client.economy.get(`${message.guild.id}.${message.member.id}.bank`)
    }
    if (client.economy.get(`${message.guild.id}.${message.member.id}.bank`) == 0) return message.channel.send("you dont have any money in your bank")
    if (isNaN(amount)) {
      return message.reply("that aint a number m8")
    }
    if (amount < 0) return message.channel.send("you cant withdraw negative values")
    if (amount > client.economy.get(`${message.guild.id}.${message.member.id}.bank`)) return message.reply("U DONT HAVE DAT MACH CAWSH WUT U THINKIN M8")
    client.economy.subtract(`${message.guild.id}.${message.member.id}.bank`, amount)
    client.economy.add(`${message.guild.id}.${message.member.id}.cash`, amount)
    message.channel.send("you withdrawed " + amount + " to your bank now it aint safe, be careful from robbers ;)")
  }
}