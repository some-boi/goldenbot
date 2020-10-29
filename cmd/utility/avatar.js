const Discord = require("discord.js")
                        

module.exports = {
  name: "avatar",
  description: "shows the pfp (profile picture) of a member",
	aliases: ["av"], module: "utility", usage: "[mention]",
  execute: (client, message, args) => {
      let user = message.mentions.members.first()
      if(!user) {
        user = message.guild.members.cache.find(m => m.user.id == args.join(" ") || m.user.username ==args.join(" "))
        if(!user) {
          user = message.author
        }
      }
        const embed = new Discord.RichEmbed().setTitle(`${user.user.username}'s avatar:`)
            .setColor("#7332a8")
            .setImage(user.user.avatarURL({dynamic: true}))
        message.channel.send(embed)
	}
}