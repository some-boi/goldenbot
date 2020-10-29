const Discord = require("discord.js")

module.exports = {
  name: "membercount",
  description: "member count for the server",
  aliases: ["mcount", "mc"],
  module: "utility",
  execute: (client, message, args) => { // spaghetti code
  let bots = message.guild.members.cache.filter(member => member.user.bot).size
  let humans = Math.floor(message.guild.members.cache.size - bots)
  let online = message.guild.members.cache.filter(member => member.presence.status === "online").size
  let dnd = message.guild.members.cache.filter(member => member.presence.status === "dnd").size
  let offline = message.guild.members.cache.filter(member => member.presence.status === "offline").size
  let idle = message.guild.members.cache.filter(member => member.presence.status === "idle").size
  let e = new Discord.RichEmbed().setTitle(`${message.guild.name}'s membercount:'`)
    .addField("members:", message.guild.members.cache.size)
    .addField("🤖 bots:", bots)
    .addField("👨 humans:", humans)
    .addField("<:online:536240817602560010>online<:online:536240817602560010>:", online)
    .addField("<:offline:536240817552228385>offline<:offline:536240817552228385>:", offline)
    .addField("<:dnd:536240817531125760>dnd (do not disturb)<:dnd:536240817531125760>:", dnd)
    .addField("<:idle:536240817522868224>idle<:idle:536240817522868224>:", idle)
    .setThumbnail(message.guild.iconURL)
    .setColor("#BBE86D");
  message.channel.send(e)
  }
}