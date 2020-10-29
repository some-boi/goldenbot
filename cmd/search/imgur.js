const { RichEmbed } = require("discord.js")
const request = require("request")


module.exports = {
  name:"imgur",
  description: "searchs something on imgur",
  usage:"<search>",
  module:"search",
  execute: (client, message, args) => {
    let arg = args.join(" ")
    let num = Math.floor(Math.random() * 11)
    let json = {
      url: `https://api.imgur.com/3/gallery/search/time/all/0?q=${arg}`,
      headers:{Authorization: `CLIENT-ID ` + "57042e891c57199"}}
    let fun = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const jsoon = JSON.parse(body)
        let r = jsoon.data[num]
        if(!jsoon.success) { 
          if(!jsoon.status == 502) return message.channel.send("It looks like our API is down")
          return message.channel.send("It looks like your result is invalid")
        }
      let l = new RichEmbed()
      .setTitle(r.title)
      .setURL(r.link)
      .setColor("RANDOM")
      
      .setDescription(!r.selftext ? '' : r.selftext)
      
      .setFooter(`⬆️ ${r.score} | 💬 ${r.num_comments}`)
      
        l.setImage(r.link)
      
      message.channel.send(l)
      } else {
        message.channel.send("i got an error")
        console.log(error)
      }
    }
    request(json, fun)
  }
}