const { Util } = require('discord.js');
const ytdl = require('ytdl-core');


module.exports = {
	name: 'unban',
	description: 'unban command.',
	usage: '[banned member]',
  module: "mod",
  permission: ["BAN_MEMBERS"],
  execute: (client, message, args) => {
    let user = args.join(" ")
    if (isNaN(user)) {
      user = client.users.find(m => m.username.startsWith(user) || m.tag == user)
    } else {
    user = client.users.find(m => m.id == user)}
    if(!user) {
      message.channel.send("thats not a valid banned member")
    }
    if (user == message.author) return message.channel.send("lol i cant unban u cuz ur not banned")
    const bot = message.guild.members.find(e => e.id == 481489864626536458)
    if(!bot.permissions.has("BAN_MEMBERS")) return message.channel.send("i dont have permissions")
    message.guild.unban(user.id)
    .catch(error => message.channel.send("that guy aint banned"))
    message.channel.send(`unbanned ${user.tag}`)
  }
}