module.exports = {
  name:"reset_economy",
  aliases: ["reconomy", "reseteconomy", "reset-economy", "resete", "re", "resetcurrency", "reset-currency" , "reset_currency","resetc", "rcurrency", "rc"],
  description: "this command will reset everyone's cash but u can reset the shop too",
  permissons: ["MANAGE_GUILD"],
  module:"economy",
  execute: async (client, message, args) => {
    const filter = m => m.author == message.author && m.channel == message.channel
    message.channel.send("are you sure about this? (yes/no)")
    const ff = await message.channel.createMessageCollector(filter, {max: 1})
    ff.on("collect", async f => {
    const lol = f.content.split(" ")    
    if (lol[0] == "no") return message.channel.send("ok then i wont do it")
    if (lol[0] != "yes" && lol[0] != "no") return message.channel.send("thats not a valid answer")
    if (lol[0] == "yes") {
      message.channel.send("should the shop also get resetted? (yes/no)")
      const ll = await message.channel.createMessageCollector(filter, { max: 1 })
      ll.on("collect", async l => {
      const noob = f.content.split(" ")    
      if (noob[0] == "no") message.channel.send("then the shop wont be resetted"); client.economy.delete(message.guild.id); return message.channel.send("then it is done")
      if (noob[0] == "yes") client.shop.delete(message.guild.id); client.economy.delete(message.guild.id); return message.channel.send("then it is done")
      if (noob[0] != "yes" && lol[0] != "no") return message.channel.send("thats not a valid answer")
      })
      }
    })
    }
  }