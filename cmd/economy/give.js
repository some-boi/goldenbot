module.exports = {
  name:"give",
  module:"economy",
  usage: "<amount> [member mention/name/id]",
  guildOnly: true,
  execute: (client, message, args) => {
    let amount = args[0]
    if (amount == "all") {
      amount = client.economy.get(`${message.guild.id}.${message.member.id}.cash`)
    }
    const member = args.join(" ").replace(amount, "")
    const user = message.mentions.members.first()
    if (!user) {
      user = message.guild.members.cache.find(m => m.id == member || m.username == member || m.tag == member)
      if (!user) return message.reply("that member is invalid")
    }
    if (isNaN(amount)) {
      return message.reply("thats not a number")
    }
    if (!client.economy.has(`${message.guild.id}.${message.member.id}`)) {
      client.economy.set(message.guild.id + "." + message.member.id, { cash: 0, bank: 0 })
    }
    if (!client.economy.has(`${message.guild.id}.${user.id}`)) {
      client.economy.set(message.guild.id + "." + user.id, { cash: 0, bank: 0 })
    }
    if (amount > client.economy.get(`${message.guild.id}.${message.member.id}.cash`)) return message.reply("you dont have enough cash")
    client.economy.subtract(`${message.guild.id}.${message.member.id}.cash`, amount)
    client.economy.add(`${message.guild.id}.${user.id}.cash`, amount)
    message.reply(`you gave ${amount} from your cash to <@${user.id}>`)
  }
}