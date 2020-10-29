const {RichEmbed} = require("discord.js")

const Discord = require("discord.js")

module.exports = {
  name:"meme",
  module:"fun",
  execute: async (client, message, args) => {
    const item = Math.floor(Math.random() * 21)
    try {
      const ar = ["dankmemes", "dankmeme", "meme", "memes", "facepalm", 'BlursedImages']
      const arg = ar[Math.floor(Math.random() * ar.length)]
   const e = await client.reddit.getSubreddit(arg).getTop()
    const r = e[item]
      let l = new RichEmbed()
      .setTitle(r.title)
      .setURL(r.url)
      .setColor("RANDOM")
      
      .setDescription(!r.selftext ? '' : r.selftext)
      
      .setFooter(`⬆️ ${r.score} | 💬 ${r.num_comments}`)
      
        l.setImage(r.url)
      
      message.channel.send(l)
      
    } catch (e) {console.error(e)}
  }
}
  
