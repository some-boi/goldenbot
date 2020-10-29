const Discord = require("discord.js")

module.exports = {
  name: "botinfo",
  description: "shows the info of the bot",
	aliases: ["binfo", "bi", "boti"], module: "utility",
  execute: (client, message, args) => {
        let totalSeconds = (message.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        totalSeconds %= 3600;
        
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        var date = Date.now(); 
        var owner = client.users.cache.get("445234723590242304")
        const embed = new Discord.RichEmbed().setTitle(`${client.user.username}'s info:`)
            .setColor("#e7f40c")
            .addField(":crown: bot owner:", owner.tag)
            .addField("latency:", Math.round(client.ws.ping) + "ms")
            .addField("support server:", `[you can join by clicking here](https://discord.gg/gtT9qk)`)
            .addField("bot invite:", `[you can invite the bot by clicking here](https://discordapp.com/api/oauth2/authorize?client_id=481489864626536458&permissions=8&scope=bot)`)
            .addField("created at:", client.user.createdAt)
            .addField("was up for:", `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
            .addField("library:", "discord.js")
            .addField("library version:", Discord.version)
            .addField("amount of servers joined:", client.guilds.cache.size)
            .addField("amount of users:", "humans: " + client.users.cache.filter(m => !m.bot).size + "\nbots: " + client.users.cache.filter(m => m.bot).size + "\ntotal: " + client.users.cache.size)
            .setThumbnail(client.user.avatarURL({dynamic: true}))
        message.channel.send(embed)
	}
}