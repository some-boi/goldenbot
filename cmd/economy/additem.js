module.exports = {
  name:"additem",
  aliases:["aitem", "addi", "ai"],
  permission: ["MANAGE_GUILD"], // cuz why not, fuck you
  module:"economy",
  usage: "<name> after that the bot will tell what to do next",
  minidocs: "upgrade list:\n-multiplier: <number> x (it multiplies the gain a member gets when used negative numbers wont be used and cant be 0 also dont forget the x)\n-gain: <amount> -<time> the bot will give cash in a specific time that u chose\njoin the support server and suggest another upgrade\nthere can be only 1 upgrade per item",
  execute: async (client, message, args) => {
    const filter = m => m.author == message.author && m.channel == message.channel
    const name = args.join(" ")
    if (!name) {
      return message.reply("theres no name for the item")
    }
    let i = 0
    for (let item in client.shop.get(message.guild.id)) { ++i }
    message.reply("how much should the item cost?, type 'cancel' to stop this setup thing")
    const hm = await message.channel.createMessageCollector(filter, { max: 1 })
    hm.on("collect", async cost => {
        
    
    const price = cost.content
    if (price.toLowerCase() == "cancel") return message.channel.send("ok now its cancelled")
    if (i == 25) return message.reply("u got to the item limit pal")
    if (!price) return message.reply("m8 theres no price for it")
    if (isNaN(price * 1)) return message.channel.send("it aint a number m8")
    if (client.shop.has(message.guild.id + "." + name)) return message.reply("that item already exists")
    message.reply("now what upgrade should i add to it? type 'none' for no upgrades, type 'cancel' to stop this setup thing")
    const hmm = await message.channel.createMessageCollector(filter, { max: 1 })
    hmm.on("collect", async upgrad => {
        
    
    const argsss = upgrad.content.split(" ")
    const upgrade = argsss[0]
    if (upgrade == "cancel") {
      client.shop.delete(message.guild.id + "." + name)
      return message.channel.send("ok now its cancelled")
    }
    
    if (!upgrade) {
      return message.reply("theres no upgrade for the item")
    }
    if (upgrade !== "multiplier" && upgrade !== "gain" && upgrade !== "none") {
      return message.channel.send("thats not a valid upgrade")
    }
    if (upgrade == "none"){
      client.shop.set(message.guild.id + "." + name, { cost: price })
    }
    if (upgrade == "multiplier") {
      const up = argsss[1]
      const multiplier = up.replace("x", "")
      if(!multiplier) return message.channel.send("theres no multiplier for the upgrade")
      if (isNaN(multiplier)) return message.channel.send("that multiplier aint a number")
      client.shop.set(message.guild.id + "." + name, { multiplier: multiplier, cost: price })
    }
    if (upgrade == "gain") {
      const gain = argsss[2]
      const up = argsss[1]
      if (gain.endsWith("s")) {
        const time = Math.floor(gain.replace("s", "") * 1000)
        if (isNaN(time)) return message.reply("thats not a valid time")
        if (!time) message.channel.send("u didnt add the time i would add the cash to the member")
        client.shop.set(message.guild.id + "." + name, { time: time, short: gain, cost: price, gain: up})
      }
      if (gain.endsWith("m")) {
        const time = Math.floor(gain.replace("m", "") * 1000 * 60)
        if (isNaN(time)) return message.reply("thats not a valid time")
        if (!time) message.channel.send("u didnt add the time i would add the cash to the member")
        client.shop.set(message.guild.id + "." + name, { time: time, short: gain, cost: price, gain: up})
      }
      if (gain.endsWith("h")) {
        const time = Math.floor(gain.replace("h", "") * 1000 * 60 * 60)
        if (isNaN(time)) return message.reply("thats not a valid time")
        if (!time) message.channel.send("u didnt add the time i would add the cash to the member")
        client.shop.set(message.guild.id + "." + name, { time: time, short: gain, cost: price, gain: up })
      }
      if (gain.endsWith("d")) {
        const time = Math.floor(gain.replace("d", "") * 1000 * 60 * 60 * 24)
        if (isNaN(time)) return message.reply("thats not a valid time")
        if (!time) message.channel.send("u didnt add the time i would add the cash to the member")
        client.shop.set(message.guild.id + "." + name, { time: time, short: gain, cost: price, gain: up })
      } 
      if (gain.endsWith("w")) {
        const time = Math.floor(gain.replace("w", "") * 1000 * 60 * 60 * 24 * 7)
        if (isNaN(time)) return message.reply("thats not a valid time")
        if (!time) message.channel.send("u didnt add the time i would add the cash to the member")
        client.shop.set(message.guild.id + "." + name, { time: time, short: gain, cost: price, gain: up })
      }
    }
    message.reply("now for the last step what role should i give for the item, type 'cancel' to stop this setup thing, type 'create' to make the bot create a role")
    const hmmmm= await message.channel.createMessageCollector(filter, { max: 1 })
    hmmmm.on("collect", async response => {
    const f = response.content
    if (f == "create") {  
      return message.guild.roles.create({name: name}).then(role => {
        client.shop.set(`${message.guild.id}.${name}.role`, role.id)
        message.channel.send("now the item creating is done")
      })
    }
    if (f == "cancel") {
      client.shop.delete(message.guild.id + "." + name)
      return message.channel.send("ok now its cancelled")
    }
    const n = message.guild.roles.cache.find(m => m.name == f || m.id == f) // .. ok purge that comment  || l.id == response.content) uh i didnt use the id for test
    if (!n) {
      client.shop.delete(message.guild.id + "." + name)
      return message.channel.send("that role is invalid")
    }
    client.shop.set(`${message.guild.id}.${name}.role`, n.id)
    message.channel.send("now the item creating is done")
    })
    })
    })
    }
  }