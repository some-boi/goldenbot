const { RichEmbed } = require("discord.js")

module.exports = {
  name:"config",
  module:"config",
  usage: "show/reset",
  description: "shows or resets the configurations on you server",
  execute: (client, message, args) => {
    const arg = args[0]
    let prefix = client.config.get(message.guild.id + ".prefix")
    if (!prefix) {
      prefix = "e!"
    }
    let ch;
    if (client.db2.has(`${message.guild.id}.channel`))  {ch = "<#" + client.db2.get(`${message.guild.id}.channel`) + ">"} else ch = "none"
    let ch1;
    if (client.db1.has(`${message.guild.id}.channel`))  {ch1 = "<#" + client.db1.get(`${message.guild.id}.channel`) + ">"} else ch1 = "none"
    let msg;
    if (client.db1.has(`${message.guild.id}.message`))  {msg = client.db1.get(`${message.guild.id}.message`)} else msg = "none"
    let msg1;
    if (client.db2.has(`${message.guild.id}.message`))  {msg1 = client.db2.get(`${message.guild.id}.message`)} else msg1 = "none"
    let role1;
    if (client.db1.has(message.guild.id + ".role")) {role1 = message.guild.roles.cache.find(m => m.id == client.db1.get(message.guild.id + ".role")).name} else {role1 = "none"}
    let role;
    if (!client.config.has(message.guild.id + ".role")) {role = "none"} else {role = message.guild.roles.cache.find(m => m.id == client.config.get(message.guild.id + ".role")).name}
    let suggestion;
    if (!client.config.has(message.guild.id + ".suggestion")) {suggestion = "none"} else {suggestion = message.guild.channels.cache.find(m => m.id == client.config.get(message.guild.id + ".suggestion")).name}
    let logs;
    if (!client.config.has(message.guild.id + ".logs")) {logs = "None"} else {logs = message.guild.channels.cache.find(m => m.id == client.config.get(message.guild.id + ".logs")).name}
    let blacklisted;
    if (!client.config.has(message.guild.id + ".blacklist")) {blacklisted = "none"} else if (client.config.get(message.guild.id + ".blacklist").length == 0) {blacklisted = "none"} else {blacklisted = client.config.get(message.guild.id + ".blacklist").join(", ")}
    if (!arg) message.reply("you forgot to choose an option(show/reset)")
    if (arg == "show") {
      const e = new RichEmbed().setTitle("config stuff:")
      .addField("muted role:", role)
      .addField("logs channel:", logs)
      .addField("prefix:", prefix)
      .addField("suggestion channel:", suggestion)
      .addField("blacklisted words:", blacklisted)
      .addField("**welcome:**", "\u200B")
      .addField("role:", role1)
      .addField("message:", msg)
      .addField("channel:", ch1)
      .addField("**goodbye:**", "\u200B")
      .addField("message:", msg1)
      .addField("channel:", ch)
      return message.channel.send(e)
    }
    if (arg == 'reset') {
      if(!message.member.hasPermission("MANAGE_ROLES")) {
        return message.reply("you dont have perms")
      }
      client.db1.delete(message.guild.id)
      client.db2.delete(message.guild.id)
      client.config.delete(message.guild.id)
      message.channel.send("now its gone, you have to do'em again if u want'em")
    }
    
  }
}