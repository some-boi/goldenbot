module.exports = {
  name:"delete",
  aliases:["remove"],
  module:"custom",
  permission: ["MANAGE_GUILD"],
  usage: "optional: welcome/goodbye/autorole",
  description: "it will delete both if u dont do the optional thing",
  execute: (client, message, args) => {
    const arg = args[0]
    if(arg === "welcome") {
      client.db1.delete(message.guild.id + ".channel")
      client.db1.delete(message.guild.id + ".message")
      return message.channel.send("now its been removed, you will have to do the thing again if u want it back")
    }
    if (arg === "goodbye") {
      client.db2.delete(message.guild.id)
      return message.channel.send("now its been removed, you will have to do the thing again if u want it back")
    }
    if (!arg) {
      client.db1.delete(message.guild.id)
      client.db2.delete(message.guild.id)
      return message.channel.send("now its been removed, you will have to do everything again again if u want it back")
    }
    if(arg === "autorole") {
      client.db1.delete(message.guild.id + ".role")
      return message.channel.send("now its been removed, you will have to do the thing again if u want it back")
    }
  }
}