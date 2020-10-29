module.exports = {
  name:"goodbye",
  module: "config",
  usage: "channel/message [other stuff]",
  permission: ["MANAGE_CHANNELS"],
  description: "just if you want a message to be sent when someone leaves",
  minidocs: "{member} is for the member's name only\n{tag} will send the member's name with the tag, {guild} for the server's name\n{count} for the amount of members there are in the server after the new member leaves\n{guild} for the server the member left",
  execute: (client, message, args) => {
    var args1 = args[0]
    if (!args[0]) return message.channel.send("you forgot to choose between the choices")
    var args2 = args.join(" ").slice(args[0].length + 1)
    if (args1 === "message") {
        if (!args2) return message.channel.send("you did not add a message")
      const role = args2
      if (!role) return message.reply("theres no message to set")
      if (!client.db2.has(message.guild.id)) {
        client.db2.set(`${message.guild.id}`, { message: role, id: message.guild.id});
        return message.channel.send(`the message is now set!`)} 
      client.db2.set(`${message.guild.id}.message`, role)
      return message.channel.send("the message is now set!")
    }
    if (args1 === "channel") {
        if (!args2) return message.channel.send("you did not specify a channel")
      const role = message.guild.channels.cache.find(m => m.name == args.join(" ").slice(args[0].length + 1) || m.id == args.join(" ").slice(args[0].length + 1) || "<#" + m.id + ">" == args.join(" ").slice(args[0].length + 1))
      if (!role) return message.reply("thats not a valid channel")
      if (!client.db2.has(message.guild.id)) {
        client.db2.set(`${message.guild.id}`, { channel: role.id, id: message.guild.id});
        return message.channel.send(`i will send the message in ${role.name} whenever someone leaves`)}
    
      client.db2.set(`${message.guild.id}.channel`, role.id)
      return message.channel.send(`i will send the message in ${role.name} whenever someone leaves`)    
    }
  }
}