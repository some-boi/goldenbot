module.exports = {
  name:"buy",
  module:"economy",
  usage:"[item]",
  execute: (client, message, args) => {
    const ite = args.join(" ")
    if (!client.shop.has(message.guild.id + "." + ite)) return message.channel.send("that item doesnt exist")
    const price = client.shop.get(message.guild.id + `.${ite}.cost`)
    const role = client.shop.get(message.guild.id + `.${ite}.role`)
    if (message.member.roles.cache.find(m => m.id == role)) return message.channel.send("you already have that item")
    const cash = client.economy.get(`${message.guild.id}.${message.member.id}.cash`)
    if (cash<price) return message.channel.send("you dont have enough cash")
    client.economy.subtract(`${message.guild.id}.${message.member.id}.cash`, price)
    message.channel.send("you bought the '" + ite + "' item from the shop and it costed you " + price + " now u only have " + (cash - price) + " left")
    message.member.roles.add(message.guild.roles.cache.find(m => m.id == role)).catch(e => {
      message.channel.send("i have no perms to add the role so ima add the cash back")
      client.economy.add(`${message.guild.id}.${message.member.id}.cash`, price)
      message.channel.send("your cash is now back to " + cash)
    })
  }
}