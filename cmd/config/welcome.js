module.exports = {
  name:"welcome",
  module: "config",
  usage: "role/channel/message [other stuff]",
  permission: ["MANAGE_CHANNELS"],
  description: "just if you want an autorole or a message when someone joins",
  minidocs: "{member} is for the member's name only\n{mention} will ping the new member when he/she joins\n{tag} will send the member's name with the tag, {guild} for the guild's name\n{count} for the amount of members there are in the server after the new member joins\n{guild} for the server the member joined",
  execute: (client, message, args) => {
    var args1 = args[0]
    if (!args[0]) return message.channel.send("you forgot to choose between the choices")
    let args2 = args.join(" ").slice(args[0].length + 1)
    if (args1 === "role") {
      let role = message.mentions.roles.first()


      if (!role) {
        role = message.guild.roles.cache.find(m => m.id == args2  || m.name == args2 )
        if (!role) return message.reply("thats not a valid role")
      }
      if (!client.db1.has(message.guild.id)) {
        client.db1.set(`${message.guild.id}`, { role: role.id, id: message.guild.id});
        return message.channel.send(`ok i will give the role ${role.name} to who joins`)}
      client.db1.set(`${message.guild.id}.role`, role.id)
      return message.channel.send(`ok i will give the role ${role.name} to who joins`)
    }
    if (args1 === "message") {
        if (!args2) return message.channel.send("you did not add the message")
      const role = args2
      if (!role) return message.reply("theres no message set")
      if (!client.db1.has(message.guild.id)) {
        client.db1.set(`${message.guild.id}`, { message: role, id: message.guild.id});
        return message.channel.send(`the message is now set!`)} 
      client.db1.set(`${message.guild.id}.message`, role)
      message.channel.send("the message is now set!")
    }
    if (args1 === "channel") {
        if (!args2) return message.channel.send("you did not specify a channel")
      const role = message.guild.channels.cache.find(m => m.name == args.join(" ").slice(args[0].length + 1) || m.id == args.join(" ").slice(args[0].length + 1) || "<#" + m.id + ">" == args.join(" ").slice(args[0].length + 1))
      if (!role) return message.reply("thats not a valid channel")
      if (!client.db1.has(message.guild.id)) {
        client.db1.set(`${message.guild.id}`, { channel: role.id, id: message.guild.id});
        return message.channel.send(`now i will send the welcome message in ${role.name} whenever someone joins`)}
      client.db1.set(`${message.guild.id}.channel`, role.id)
      message.channel.send(`now i will send the welcome message in ${role.name} whenever someone joins`)    
    }
  }
}
// bruh moment, did u read my messages, btw... I fixed you with stupid ass errors