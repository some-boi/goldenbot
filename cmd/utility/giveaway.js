const { RichEmbed } = require("discord.js")
module.exports = {
  name:"giveaway",
  aliases: ["ga", "gaway", "givea"],
  usage: "<prize>",
  description: "made for giving away something to a member",
  module:"utility",
  permission: ["MANAGE_MESSAGES"],
  execute: async (client, message, args) => {
    const arg = args.join(" ")
    let wait;
    let req;
    if (!arg) return message.reply("theres no prize")
    const filter = m => m.author == message.author && m.channel == message.channel
    const emo = message.guild.emojis.get(e => e.id == "667734795299586048")
    message.channel.send("where will i send the message to? use the channel's name or id, example: testy-test")
    const smthh = await message.channel.createMessageCollector(filter, { max: 1 })
    smthh.on("collect", async smth => {
    const argss = smth.first().content.split(" ")
    let channel = message.guild.channels.cache.find(e => e.name == argss.join(" ").replace(" ", "-") || e.id == argss.join(" ") ||  "<#"+e.id+">" == argss.join(" "))
    if (!channel) return message.reply("that channel is invalid")
    message.channel.send("how much time till the giveaway ends?")
    const stufff = await message.channel.createMessageCollector(filter, { max: 1 })
    stufff.on("collect", async stuff => {
    const lol = stuff.content
    if (!isNaN(lol)) {
      const seconds = Math.floor(lol * 1000)
      wait = seconds      
    }else if (lol.endsWith("s")) {
      const seconds = Math.floor(lol.replace("s", "") * 1000)
      if (isNaN(seconds)) {
        return message.reply("thats not a valid tme argument")
      }
      wait = seconds
    }else if (lol.endsWith("m")) {
      const seconds = Math.floor(lol.replace("m", "") * 1000 * 60)
      if (isNaN(seconds)) {
        return message.reply("thats not a valid tme argument")
      }
      wait = seconds
    }else if (lol.endsWith("h")) {
      const seconds = Math.floor(lol.replace("h", "") * 1000 * 60 * 60)
      if (isNaN(seconds)) {
        return message.reply("thats not a valid tme argument")
      }
      wait = seconds
    }else if (lol.endsWith("d")) {
      const seconds = Math.floor(lol.replace("s", "") * 1000 * 60 * 60 * 24)
      if (isNaN(seconds)) {
        return message.reply("thats not a valid tme argument")
      }
      wait = seconds
    } else if (lol.endsWith("w")) {
      const seconds = Math.floor(lol.replace("w", "") * 1000 * 60 * 60 * 24 * 7)
      if (isNaN(seconds)) {
        return message.reply("thats not a valid tme argument")
      }
      wait = seconds
    }else return message.reply("thats not a valid time argument")
    message.channel.send("what requirements should the giveaway have?")
    message.channel.send("ok now its done and will send the giveaway")
    const e = new RichEmbed().setTitle(":tada: giveaway :tada::")
    .addField("prize:", args.join(" "))
    .addField("time:", lol)
    .addField("hosted by:", message.author)
    .setColor("RANDOM")
    .setTimestamp()
    channel.send(e)
    .then(async m => {
      m.react("🎉")
      .then(f => {
        const arr = []
        client.setTimeout(() => {
          for (let i in f.users.cache.filter(m => !m.bot).map(e => e.id)) {
            arr.push(f.users.cache.filter(m => !m.bot).map(e => e.id)[i])
            if (i == client.user) arr.slice(1)
          }
        const id = Math.floor(Math.random() * arr.length)
        if (!arr[id]) return channel.send("theres no winner since no one joined")
          channel.send("<@" + arr[id] + "> has won the giveaway")
        }, wait)
        
      })
    })
      })
    })
  }
}