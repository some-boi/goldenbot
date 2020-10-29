const {RichEmbed} = require("discord.js")

const Discord = require("discord.js")

module.exports = {
  name:"gayporn",
  module:"nsfw",
  description: "fetches some gay porn",
  nsfwOnly: true,
  execute: async (client, message, args) => {
const rand = Math.floor(Math.random() * 21)
    try {
      const subreddits = ["gayporn"]
      const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)]
   const e = await client.reddit.getSubreddit(subreddit).getHot()
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
      
    } catch (e) {console.error(e)}
  }
}