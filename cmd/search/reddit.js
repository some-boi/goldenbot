const {RichEmbed} = require("discord.js")

const Discord = require("discord.js")

module.exports = {
  name:"reddit",
  module:"search",
  description: "searchs something on reddit",
  usage: "<search>",
  execute: async (client, message, args) => {
const rand = Math.floor(Math.random() * 21)
    try {
      const arg = args[0]
      if (!arg) {
        return message.channel.send("input something for me to search")
      }
   const e = await client.reddit.getSubreddit(arg).getHot()
    const r = e[rand]
      if(r.over_18 && !message.channel.nsfw) {
        return message.channel.send("this is an NSFW (not safe for work) result, i can only send it in NSFW channels")
      }
      let l = new RichEmbed()
      .setTitle(r.title)
      .setURL(r.url)
      .setColor("RANDOM")
      
      .setDescription(!r.selftext ? '' : r.selftext)
      
      .setFooter(`⬆️ ${r.score} | 💬 ${r.num_comments}`)
      
        l.setImage(r.url)
      
      message.channel.send(l)
      
    } catch (e) {message.channel.send("thats not a valid result")}
  }
}