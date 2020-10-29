module.exports = {
  name:"add_cash",
  aliases: ["addcash", "add-cash", "addmoney", "add_money", "add-money"],
  module:"economy",
  description: "add money to someone",
  permission: ["MANAGE_GUILD"],
  usage: "[member] <optional (defaults to cash): bank/cash> <amount>",
  execute: (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      user = message.client.users.cache.find(m => m.id == args[0] || m.username.startsWith(args[0]))
      if(!user) {
        return message.reply("thats not a valid member")
      }
    }
    const amount = args[2]
    if (isNaN(amount)) return message.channel.send("thats not a valid number")
    if (amound < 0) return message.channel.send("why are you trying to deposit negative amounts?")
    const choice = args[1]
    if (choice == "bank") {
      client.economy.add(message.guild.id + "." + user.id + ".bank", amount)
      return message.channel.send("added " + amount + " to " + user.username + "'s bank")
    }
    if (choice == "cash") {
      client.economy.add(message.guild.id + "." + user.id + ".cash", amount)
      return message.channel.send("added " + amount + " to " + user.username + "'s hand")
    }
    if (choice != "bank" && choice != "cash") {
      if (!isNaN(choice)) return message.channel.send("thats not a valid number")
      client.economy.add(message.guild.id + "." + user.id + ".cash", amount)
      return message.channel.send("added " + amount + " to " + user.username + "'s hand")
    }
  }
}