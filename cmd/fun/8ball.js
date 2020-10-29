module.exports = {
  name:"8ball",
  module:"fun",
  aliases: ["ask"],
  execute: (client, message, args) => {
    const answers = ["its a yes", "theres no doubts", "nope", "impossible", "maybe", "theres no answer to that", "yes."];
    var answer = answers[Math.floor(Math.random() * (answers.length - 1)) + 1];
    message.channel.send(answer)
    
  }
}