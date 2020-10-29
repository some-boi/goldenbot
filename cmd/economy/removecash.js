module.exports = {
  name:"remove_cash",
  aliases: ["removecash", "remove-cash", "removemoney", "remove_money", "remove-money"],
  module:"economy",
  description: "add money to someone",
  permissions: ["MANAGE_GUILD"],
  usage: "[member] <optional (defaults to cash): bank/cash> <amount>",
  execute: (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      user = message.client.users.find(m => m.id == args[0] || m.username.startsWith(args[0]))
      if(!user) {
        return message.reply("thats not a valid member")
      }
    }
    const amount = args[2]
    if (isNaN(amount)) return message.channel.send("thats not a valid number")
    const choice = args[1]
    if (choice == "bank") {
      client.economy.subtract(message.guild.id + "." + user.id + ".bank", amount)
      return message.channel.send("removed " + amount + " from " + user.username + "'s bank")
    }
    if (choice == "cash") {
      client.economy.subtract(message.guild.id + "." + user.id + ".cash", amount)
      return message.channel.send("removed " + amount + " from " + user.username + "'s hand")
    }
    if (choice != "bank" && choice != "cash") {
      if (!isNaN(choice)) return message.channel.send("thats not a valid number")
      client.economy.subtract(message.guild.id + "." + user.id + ".cash", amount)
      return message.channel.send("removed " + amount + " from " + user.username + "'s hand")
    }
  }
}