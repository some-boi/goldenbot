// my fav command right now
module.exports = {
  name:"say",
  aliases:["echo"],
  usage: "<text>",
  module:"fun",
  execute: (client, message, args) => {
    if(!args[0]) return message.channel.send("What are you doing with empty say???")
    const text = args.join(" ")
    message.channel.send(text.replace("@", "\u200B") + "\n\n       with love,  " + message.author.tag)
    message.delete()
  }
}