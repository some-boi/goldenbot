const Discord = require("discord.js")

module.exports = {
  name: "defaultavatar",
  description: "shows the default avatar of a member",
	aliases: ["davatar", "da", "defaulta"], module: "utility", usage: "[mention]", 
  execute: (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      user = message.client.users.cache.find(m => m.id == args[0]|| m.username == args.join(" "))
      if(!user) {
        user = message.author
      }
    }
        const embed = new Discord.RichEmbed().setTitle(`${user.username}'s default avatar:`)
            .setColor("#ff8000")
            .setImage(user.defaultAvatarURL)
        message.channel.send(embed)
	}
}