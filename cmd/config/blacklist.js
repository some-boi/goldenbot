module.exports = {
    name:"blacklist",
    module:"config",
    permission: ["MANAGE_MESSAGES"],
    description: "add blacklisted words so whenever someone says it in a message it gets deleted",
    execute: (client, message, args) => {
        if (!args[0]) return message.channel.send("you forgot to add an option (add/remove)")
        if (args[0] == "add") {
            if (!args[1]) return message.channel.send("you didnt specify a word to blacklist")
            if (!client.config.has(message.guild.id + ".blacklist")) client.config.set(message.guild.id + ".blacklist", [])
            client.config.push(message.guild.id + ".blacklist", args[1])
            message.channel.send(args[1] + " has been blacklisted")
        } else if (args[0] == "remove") {
            if (!client.config.has(message.guild.id + ".blacklist")) return message.channel.send("thats not a valid blacklisted word")
            if (args[1] in client.config.get(message.guild.id + ".blacklist")) {} else {return message.channel.send("thats not a valid blacklisted word")}
            const arr = client.config.get(message.guild.id + ".blacklist")
            const index = arr.indexOf(args[1])
            arr.splice(index, 1)
            client.config.delete(message.guild.id + ".blacklist")
            client.config.set(message.guild.id + ".blacklist", arr)
            message.channel.send(args[1] + " has been removed from the blacklist")
        } else {
           return message.channel.send("thats not a valid option (add/remove)") 
        }
            
    }
}