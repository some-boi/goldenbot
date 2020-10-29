const {RichEmbed} = require("discord.js")  
module.exports = { 
  name:"leaderboard", 
  aliases: ["lb", "lboard", "leaderb"], 
  module:"economy", 
  execute: (client, message, args) => { 
    var arr = [] 
    for (let i in client.economy.get(message.guild.id)) { 
      const amount = client.economy.get(message.guild.id + "." + i + ".cash") + client.economy.get(message.guild.id + "." + i + ".bank") 
      arr.push(amount) 
      if (arr.length == 10) break }  let members = 0 
      for (let i in client.economy.get(message.guild.id)) ++members 
      if (members == 0) return message.channel.send("theres no one in the leaderboard")     
    const l = new RichEmbed().setTitle(message.guild.name + "'s top 10 leaderboard:") 
    .setThumbnail(message.guild.iconURL) 
    .setTimestamp() 
    .setColor("GOLD"); 
    arr.sort(function(a, b){return a - b}); 
    arr.reverse() 
    for(let e in arr) { 
      for (let i in client.economy.get(message.guild.id)) { 
        if (client.economy.get(message.guild.id + "." + i + ".cash") + client.economy.get(message.guild.id + "." + i + ".bank") == arr[e]) { 
          const m = message.guild.members.cache.find(m => m.id == i) 
          l.addField(m.user.tag + ":", "**cash: **" + client.economy.get(message.guild.id + "." + i + ".cash") + "\n**bank: **" + client.economy.get(message.guild.id + "." + i + ".bank") +"\n**total: **" +arr[e]) } } }   
    message.channel.send(l) 
  } 
}