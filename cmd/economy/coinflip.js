const {RichEmbed} = require("discord.js")

module.exports = {
    name:"coinflip",
    usage:"<amount> [heads/tails](defaults to heads)",
    module: "economy",
    description: "bet to either lose or win money",
    execute:(client, message, args) => {
        const amount = args[0]
        if (!amount) return message.channel.send("you forgot to add the amount")
        let stuff = args.join(" ").slice(amount.length + 1).toLowerCase()
        if(!stuff) {
            stuff = "heads"
        }
        let arr = ["tails", "heads"]
        let random = arr[Math.floor(Math.random() * arr.length)]
        if (!amount) return message.channel.send("please specify how much you want to bet")
        if (isNaN(amount)) return message.channel.send("the amount isnt a number")
        if (!client.economy.has(message.guild.id + "." + message.author.id + ".cash") || client.economy.get(message.guild.id + "." + message.author.id + ".cash") < amount) {
            return message.channel.send("you don't have enough money")
        }
        client.economy.subtract(message.guild.id + "." + message.author.id + ".cash", amount)
        if (stuff != random) {
            const e = new RichEmbed().setTitle("coin flip:").setDescription("you have lost and lost the cash you have bet with!\nyou chose: " + stuff + "\nit was: " + random).setColor("RED")
            message.channel.send(e)
        } else {
            const e = new RichEmbed().setTitle("coin flip:").setDescription("you have won and gained twice as much of ur bet!\nyou chose: " + stuff + "\nit was: " + random).setColor("GREEN")
            message.channel.send(e)
            client.economy.add(message.guild.id + "." + message.author.id + ".cash", amount * 1 * 2)
        }
    }
}