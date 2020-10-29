const Discord = require("discord.js");
module.exports = {
    name: "name",
	aliases: ['username', "setname"], module: "owner",
  description: "makes the bot change its name",
	usage: "<code>",
	ownerOnly: true,
    execute: (client, message, args) => {
      const name = args.join(" ")
      client.user.setUsername(name)
      message.channel.send(`i changed my name to ${name}`)
    }
}