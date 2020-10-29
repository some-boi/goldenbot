const {RichEmbed} = require("discord.js")

module.exports = {
  name:"cat",
  module:"fun",
  description: "it fetches fresh cat pics from reddit",
  aliases: ["pussy"],
  execute: async (client, message, args) => {
            function rand() {
          let num = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20"
          ];
          let item = num[Math.floor(Math.random() * num.length)];
          return item;
        }
    try {
   const e = await client.reddit.getSubreddit("cat").getHot()
    const r = e[rand()]
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