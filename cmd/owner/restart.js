const Discord = require("discord.js")
module.exports = {
  name: "restart",
  aliases: ["reload", "r"],
  module:"owner",
  ownerOnly: true,
  execute: (client, message, args) => {
    let embed1 = new Discord.RichEmbed()
      .setTitle("reset command:")
      .setDescription("restarting")
      .setTimestamp()
      .setThumbnail(client.user.avatarURL);
    let embed2 = new Discord.RichEmbed()
      .setTitle("reset command:")
      .setDescription("successfuly restarted the bot and shit")
      .setTimestamp()
      .setThumbnail(client.user.avatarURL)
      .setColor("GOLD")
    message.channel.send(embed1)
      .then(m => m.delete(3000))
      .then(() => message.channel.send(embed2))
      .then(() => process.exit())
      .catch(err => console.log(err))
  }
}