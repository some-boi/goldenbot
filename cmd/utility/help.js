const fs = require("fs")
const discord = require("discord.js")
const paginator = require("./../../paginate/help_paginator.js")
module.exports = { // i also used ur help command dont judge lol
    name: "help",
    aliases: ['h'],
    description: "Shows list of commands",
    usage: "<name of command>[optional] ",
    module: "utility",
    execute: (client, message, args) => {
        let bruh = args[0]
        if(bruh) {
          var cmmd = client.commands.find(m => m.name == bruh && !m.ownerOnly)
          if (!cmmd) return message.channel.send("thats not a valid command")
            let e1 = new discord.RichEmbed()
            .setColor("GOLD")
            .setTitle(`${cmmd.name}`)
            .setColor("RANDOM")
            .setDescription(!cmmd.description ? "No description found" : cmmd.description)
            .addField("mini documentation:", !cmmd.minidocs ? "No minidocs here" : cmmd.minidocs)
            .addField("Usage", !cmmd.usage ? `e!${cmmd.name}` : `e!${cmmd.name} ${cmmd.usage}`)
            .addField("Aliases", !cmmd.aliases || cmmd.aliases.lenght < 1 ? "No aliases" : cmmd.aliases.join(", "))
            .addField("Cooldown", !cmmd.cooldown ? "0 seconds" : `${cmmd.cooldown} seconds`)
            .addField("Permission requirement", !cmmd.permission ? "No requirements" : cmmd.permission.join(", "))
            .addField("Hidden?", !cmmd.hidden ? "No hidden" : "Yes")
          return message.channel.send(e1)
        }
        const modules = fs.readdirSync(`./cmd/`).filter(file => !file.startsWith("_"))
        paginator(client, message, args)
    }
}