const { RichEmbed } = require("discord.js");

module.exports = {
  name: "shop",
  aliases: ["market", "store"],
  module: "economy",
  execute: (client, message, args) => {

    let i = 0;
    for (let item in client.shop.get(message.guild.id)) {
      ++i;
    }
    if (i == 0) return message.reply("theres no item in the shop m8");
    const e = new RichEmbed()
      .setTitle(message.guild.name + "'s shop [" + i + " items]")
      .setColor("GOLD")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({dynamic: true}));
    for (let i in client.shop.get(message.guild.id)) {
      let smth;
      if (client.shop.has(message.guild.id + "." + i + ".multiplier")){
        smth = client.shop.get(message.guild.id + "." + i + ".multiplier") + "x";
      e.addField("item: " + i, "price: " + client.shop.get(message.guild.id + "." + i + ".cost") + "\n" + "multiplier: " + client.shop.get(message.guild.id + "." + i + ".multiplier") + "x" + "\n" + "role: " + message.guild.roles.cache.find(m => m.id == client.shop.get(message.guild.id + "." + i + ".role")).name)}
      if (client.shop.has(message.guild.id + "." + i + ".gain")) {
        smth = client.shop.get(message.guild.id + "." + i + ".gain");
        e.addField("item: " + i, "price: " + client.shop.get(message.guild.id + "." + i + ".cost") + "\n" + "amount of cash gain by time: " + client.shop.get(message.guild.id + "." + i + ".gain") + "\n" + "time: " + client.shop.get(message.guild.id + "." + i + ".short") + "\n" + "role: " + message.guild.roles.find(m => m.id == client.shop.get(message.guild.id + "." + i + ".role")).name)      
      }
      if (!client.shop.has(message.guild.id + "." + i + ".gain") && !client.shop.has(message.guild.id + "." + i + ".multiplier")) {
        e.addField("item:" + i, "price: " + client.shop.get(message.guild.id + "." + i + ".cost") + "\nrole: " + message.guild.roles.cache.find(e => e.id ==client.shop.get(message.guild.id + "." + i + ".role")).name)
      }
    }
    message.channel.send(e);
  }
};