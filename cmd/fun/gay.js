module.exports = {
  name:"gay",
  aliases: ["howgay"],
  module:"fun",
  execute: (client, message, args) => {
      let user = message.mentions.members.first()
      if(!user) {
        user = message.guild.members.cache.find(m => m.user.id == args[0] || m.user.username == args[0])
        if(!user) {
          user = message.author
        }
      }
    
    const percent = Math.floor(Math.random() * 101)
    message.channel.send(`:rainbow_flag: <@${user.id}> is ${percent}% gay :rainbow_flag:`)
  }
}