const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "shows info of a member",
	aliases: ["memberinfo", "minfo", "uinfo", "info"], module: "utility", usage: "[mention]",
  execute: (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      user = message.client.users.cache.find(m => m.id == args.join(" ") || m.username == args.join(" "))
      if(!user) {
        user = message.author
      }
    }
        const member = client.users.cache.get(user.id);
        var roles;
        if (message.member.roles.cache.size === 0) {
            roles = 'None';
        }
        if (message.member.roles.cache.size > 20) {
            roles = 'there are too many roles'
        } else {
            roles = message.member.roles.cache.map(e => e).join(" ");
        }
        var activity;
        if (!member.presence.game) {
          activity = "this user isnt playing anything"
        } else {
          activity = member.presence.game
        }
        const embed = new Discord.RichEmbed().setTitle(`${member.username}'s info`)
            .setThumbnail(member.avatarURL({dynamic: true}))
            .setColor("#34eb3d")
            .addField("descriminator:", `${member.discriminator}`)
            .addField("account created at:", `${member.createdAt}`)
            .addField("is dis pro a bot or nah:", `${member.bot}`)
            .addField("this noob's id:", `${member.id}`)
            .addField("status:", `${member.presence.status}`)
            .addField("activity:", activity)
            .addField("roles:", roles)
        message.channel.send(embed)
	}
}