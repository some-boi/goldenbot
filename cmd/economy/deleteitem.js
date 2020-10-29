module.exports = {
  name:"deleteitem",
  aliases: ["removeitem", "ri", "di", "deletei", "removei", "ditem", "ritem"],
  module:"economy",
  permissions: ["ADMINISTRATOR"],
  usage: "<item thats already exists\all>",
  execute: async (client, message, args) => {
    const arg = args.join(" ")
    if (!client.shop.has(message.guild.id)) {
      return message.channel.send("theres no item in the shop what do u want me to do REEEEEEEE")
    }
    const filter = m => m.author == message.author && m.channel == message.channel
    if (arg == "all") {
      message.channel.send("all items are now removed")
      return client.shop.delete(message.guild.id)
    }
    const item = client.shop.get(message.guild.id + "." + arg)
    if (!item) return message.channel.send("that item doesnt exist")
    message.channel.send("are u sure u want to do this? no/yes")
    const smthh = await message.channel.createMessageCollector(filter, { max: 1 })
    smthh.on("collect", async smth => {
    const response = smth.content
    if (response !== "no" && response !== "yes") return message.reply("you have to say yes or no, now do the command again mate")
    if (response == "yes") {
      client.shop.delete(message.guild.id + "." + arg)
      message.channel.send("ok its deleted")
    }
    if (response == "no") return message.channel.send("ok i wont delete that item")
    })
  }
}