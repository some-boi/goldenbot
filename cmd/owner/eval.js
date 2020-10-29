const discord = require("discord.js")

module.exports = {
    name:"eval",
    module:"pterodactyl",
    ownerOnly: true,
    execute: (client, message, args) => {
		const clean = text => {
            if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace("\n", "; ");
            else return text.replace("\n", "; ");
		};
		try{
		let lol = eval(args.join(" "))
	    if (typeof(lol) !== "string") {
	        lol = require("util").inspect(lol);
	    }
	    if (clean(lol).length > 2000) {
	        return message.channel.send(`(node:15) UnhandledPromiseRejectionWarning: DiscordAPIError: Invalid Form Body
content: Must be 2000 or fewer in length. `, {code: "js"})
	    } else if (clean(lol) <= 0) {
	        return message.channel.send("")
	    } else {
            return message.channel.send(clean(lol), {code:"js"})
	    }
	    } catch (error) {
	       	message.channel.send("ERROR")
		    return message.channel.send(error, {code: "js"})
	    }
		
    }
};