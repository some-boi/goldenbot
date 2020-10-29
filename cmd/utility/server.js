const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "shows the server's info",
	aliases: ["sinfo", "si", "guildinfo", "gi", "guildi", "ginfo"], module: "utility",
  execute: (client, message, args) => {
    let veriflevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        var bots = message.guild.members.cache.filter(member => member.user.bot).size
        var humans = Math.floor(message.guild.members.cache.size - bots)
    let verif;
    switch (message.guild.verificationLevel) {
      case "NONE":
        verif = "None";
        break;
      case "LOW":
        verif = "Low";
        break;
      case "MEDIUM":
        verif = "Medium";
        break;
      case "HIGH":
        verif = "High";
        break;
      case "VERY_HIGH":
        verif = "Very High";
        break;
      default:
        verif = "Unknown";
        break;
    }
    let tier = {
      0: "No tier",
      1: "Tier 1",
      2: "Tier 2",
      3: "Tier 3"
    }
        const embed = new Discord.RichEmbed().setTitle(`${message.guild.name}'s server info:`)
            .setColor("#4e32a8")
            .addField("owner:", `${message.guild.owner}`)
            .addField("server id:", `${message.guild.id}`)
            .addField("member count:", `${message.guild.memberCount}`)
            .addField("afk channel:", `${message.guild.afkChannel}`)
            .addField("server created at:", message.guild.createdAt)
    .addField("Stats", `
Members: ${message.guild.members.cache.size}
Humans: ${humans}
Bots: ${bots}
Roles: ${message.guild.roles.cache.size}
Channels: ${message.guild.channels.cache.size}
emojis: ${message.guild.emojis.cache.size}
`)
            .addField("verification level:", verif)
            .addField("Guild Boost", `
Count: ${message.guild.premiumSubscriptionCount}
Tier: ${tier[message.guild.premiumTier]}
`)
    
            .addField("region:", message.guild.region)
            .addField("Features", message.guild.features.length >= 1 ? message.guild.features.join(", ") : "None")
            .setThumbnail(message.guild.bannerURL({dynamic: true}));
        message.channel.send(embed)
   }
}