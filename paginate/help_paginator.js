const discord = require("discord.js")
const fs = require("fs")

module.exports = async (client, message, args) => {
  let arr = []
  let current = 0
  const modules = fs.readdirSync(`./cmd/`).filter(file => !file.startsWith("_"))
  for (let module in modules.map(e => e)) {
    arr.push({module: modules.map(e => e)[module], commands: []})
    for (let i in client.commands.filter(m => m.module == modules.map(e => e)[module]).map(m => m)) {
      arr[module].commands.push(client.commands.filter(m => m.module == modules.map(e => e)[module]).map(m => `\`${m.name}\`\n${!m.description ? "No description found" : m.description}`)[i])
    }
  }
  const e = new discord.RichEmbed().setTitle("module " + arr[current].module + " (out of " + arr.length + " modules) :")
  .setDescription('**commands: (' + client.commands.size + ' commands total)**\n' + arr[current].commands.join("\n"))
  .setColor("GOLD") // cute savage's favorite gay color
  .setFooter("if you had encountered any bugs let me know in the bot support server https://discord.gg/gtT9qk\npage " + Math.floor(current + 1) + "/" + Math.floor(arr.length)) 
  message.channel.send(e).then(async msg => {
     await msg.react("⏮️")
     await msg.react("⬅️") // nvm, but put await inside settimeout
     await msg.react("⏹️")
     await msg.react("➡️")
     await msg.react("⏭️")
    await paginate(msg)
  })
  async function paginate(msg) {
    const filter = (reaction, user) => reaction.emoji.name == '⬅️' && user.id == message.author.id || reaction.emoji.name == "➡️" && user.id == message.author.id || reaction.emoji.name == "⏹️" && user.id == message.author.id || reaction.emoji.name == "⏮️" && user.id == message.author.id || reaction.emoji.name == "⏭️" && user.id == message.author.id
    const reactions = await msg.createReactionCollector(filter, {time: 600000})
    reactions.on("collect",async lol => {
      if (lol.emoji.name == '⬅️') {
        if (current == 0) return lol.remove(message.author)
          current = current - 1
          const e1 = new discord.RichEmbed().setTitle("module " + arr[current].module + " (out of " + arr.length + " modules) :")
          .setDescription('**commands: (' + client.commands.size + ' commands total)**\n' + arr[current].commands.join("\n"))
          .setFooter("if you had encountered any bugs let me know in the bot support server https://discord.gg/gtT9qk\npage " + Math.floor(current + 1) + "/" + Math.floor(arr.length)) 
          .setColor("GOLD")
          msg.edit(e1)
      }
      if (lol.emoji.name == '➡️') {
        if (current == arr.length - 1) return lol.users.remove(message.author.id)
          current = current + 1
          const e1 = new discord.RichEmbed().setTitle("module " + arr[current].module + " (out of " + arr.length + " modules) :")
          .setDescription('**commands: (' + client.commands.size + ' commands total)**\n' + arr[current].commands.join("\n"))
          .setFooter("if you had encountered any bugs let me know in the bot support server https://discord.gg/gtT9qk\npage " + Math.floor(current + 1) + "/" + Math.floor(arr.length)) 
          .setColor("GOLD")
          msg.edit(e1)
        }
      if (lol.emoji.name == '⏮️') {
        if (current == 0) return lol.users.remove(message.author.id)
          current = 0
          const e1 = new discord.RichEmbed().setTitle("module " + arr[current].module + " (out of " + arr.length + " modules) :")
          .setDescription('**commands: (' + client.commands.size + ' commands total)**\n' + arr[current].commands.join("\n"))
          .setFooter("if you had encountered any bugs let me know in the bot support server https://discord.gg/gtT9qk\npage " + Math.floor(current + 1) + "/" + Math.floor(arr.length)) 
          .setColor("GOLD")
          msg.edit(e1)
        }
      if (lol.emoji.name == '⏭️') {
        if (current == arr.length - 1) return lol.users.remove(message.author.id)
          current = arr.length - 1
          const e1 = new discord.RichEmbed().setTitle("module " + arr[current].module + " (out of " + arr.length + " modules) :")
          .setDescription(arr[current].commands.join("\n")  + '\n')
          .setFooter("if you had encountered any bugs let me know in the bot support server https://discord.gg/gtT9qk\npage " + Math.floor(current + 1) + "/" + Math.floor(arr.length)) 
          .setColor("GOLD")
          msg.edit(e1)
        }
      if (lol.emoji.name == '⏹️') {
          reactions.stop()
      }
      lol.users.remove(message.author.id)
    })
    reactions.on("end", () => {
      msg.reactions.removeAll()
      //lol ez pz now done
    })
  }} 
// are you trying to inspire paginator from d.py? kinda but nah ok.