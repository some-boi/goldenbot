module.exports = {
  name:"youtube",
  aliases:["yt"],
  module:"search",
  description: "searchs something on youtube",
  usage:"<search>",
  nsfwOnly: true,
  execute: (client, message, args) => {
    const arg = args.join(" ")
    client.yt.searchVideos(arg, 4)
    .then(message.channel.send("searching..."))
    .then(r => message.channel.send(`https://www.youtube.com/watch?v=${r[0].id}`))
    .catch(console.log)
  }
}