const Discord = require("discord.js")
module.exports = {
  name:"imitate",
  aliases:["clone"],
  module: "fun",
  usage: "<text>",
  execute: (client, message, args) => {
      let lol = args.join(" ")
      if(!args[0]) return message.channel.send("you forgot to add what the bot should say")
    message.delete()
    message.channel.createWebhook(message.author.username, {avatar: message.author.avatarURL({dynamic:true})})
    .then(hook => {
      const webhook = new Discord.WebhookClient(hook.id, hook.token)
      webhook.send(lol.replace("@", "@\u200B")).then(a => 
      client.setTimeout(() => webhook.delete(), 1000 ))
    });
  }
}