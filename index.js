const db = require("quick.db")
const fs = require('fs')
const Discord = require('discord.js')
Discord.RichEmbed = Discord.MessageEmbed
const youtube = require("simple-youtube-api")
const client = new Discord.Client({disableMentions: "everyone", 
           partials: ['MESSAGE', 'CHANNEL', 'REACTION', "GUILD_MEMBER"] })
client.commands = new Discord.Collection()
client.yt = new youtube("AIzaSyDPKa-U_1Vkfxvun0FzlZcbViNOayLeck8");
client.remind = new db.table("remind")
client.db1 = new db.table("welcom")
client.db2 = new db.table("goodby")
client.warn = new db.table("warn")
client.selfrole = new db.table("selfrole")
client.mute = new db.table("duration")
client.economy = new db.table("economy")
client.config = new db.table("muted")
client.shop = new db.table("shop")
client.spam = new db.table("spam")
client.blacklist = new db.table("blacklist")
const snoowrap = require('snoowrap');

client.queue = new Map();
client.reddit = new snoowrap({
  userAgent: "goldenbot",
  clientId: "bg01h7AJ20HHjA",
  clientSecret: "P_kR1kEYVsFCPUay5h_270XUNZ4",
  username: 'cutesavage694',
  password: "amazigh2005" // o ok
});



// queue

const BotList = require('botlist');
const botID = "481489864626536458";
const omfg = new BotList.Client(botID, {
    tokens: {
        "discordextremelist.xyz": "DELAPI_eee5c4572375bd01c309c97a8dbe1268-481489864626536458"
    },
    interval: 1000 * 60 * 30
});

omfg.on('beforePost', () => {
    if (!client.ready) return;
    const serverCount = client.guilds.size;
    omfg.update(serverCount);
});

omfg.on('afterPost', (successful, failed) => {
    console.log('Just finished posting to all bot lists, ' + successful + ' were successful, ' + failed + ' failed to post');
});

omfg.on('error', (error) => {
    console.warn('Something happened', error);
});

omfg.start();

const modules = fs.readdirSync(`./cmd/`).filter(file => !file.startsWith("_"))
for(const module1 of modules) {
	const commandFiles = fs.readdirSync(`./cmd/${module1}/`).filter(file => file.endsWith('.coffee') || file.endsWith(".js"));
	console.log(`Module: ${module1}`)
     for (const file of commandFiles) {
	   const command = require(`./cmd/${module1}/${file}`);
	   client.commands.set(command.name, command);
	   console.log(`${file} loaded!`)
    }
}
const cooldowns = new Discord.Collection();

client.on('ready', () => {
    console.log(`hehe my name's ${client.user.tag}`);
    client.user.setPresence({activity: {name: "over " + client.guilds.cache.size + " servers with over " + client.users.cache.filter(m => !m.bot).size + " users", type:"WATCHING"}, status: "dnd"})
    client.setInterval(() => client.user.setPresence({activity: {name: "over " + client.guilds.cache.size + " servers with over " + client.users.cache.filter(m => !m.bot).size + " users", type:"WATCHING"}, status: "dnd"}), 15000)
    if (client.shop.all().length == 0) return
  for (let i in client.guilds.cache.map(e => e.id)) {
    const guild = client.guilds.cache.find(l => l.id == client.guilds.cache.map(e => e.id)[i])
    for (let e in client.shop.get(guild.id)) {
      if (client.shop.has(guild.id + "." + e + ".gain")) {
        client.setInterval(() => {
          for (let p in guild.members.cache.find(l => l.id)) {
            const member  = guild.members.cache.find(l => l.id == guild.members.cache.map(l => l.id)[p])
            if (member.roles.find(a => a.id == client.shop.get(guild.id + "." + e + ".role"))) {
              client.economy.add(guild.id + "." + member.id + ".cash", client.shop.get(guild.id + "." + e + ".gain"))
            }
          }
        }, client.shop.get(guild.id + "." + e + ".time"))
      } else continue
    }
  }
}); 


client.on("guildDelete", guild => {
  if (client.economy.has(guild.id)) client.economy.delete(guild.id)
  else if (client.db1.has(guild.id)) client.db1.delete(guild.id)
  else if (client.db2.has(guild.id)) client.db2.delete(guild.id)
  else if (client.config.has(guild.id)) client.config.delete(guild.id)
  else if (client.shop.has(guild.id)) client.shop.delete(guild.id)
  else return
})

client.on("guildCreate", guild => {
    const ch = client.channels.cache.get("708330191361146910")
    const members = guild.members.cache.size
    const bots = guild.members.cache.filter(e => e.user.bot).size
    const humans = guild.members.cache.filter(e => !e.user.bot).size
    const e = new Discord.RichEmbed()
    .setTitle("joined " + guild.name + ":")
    .addField("humans:", humans)
    .addField("bots:", bots)
    .addField("total:", members)
    if (bots < humans) {
        e.setColor("GREEN")
    } else if(bots == humans) {
        e.setColor("GOLD")
    } else if (bots > humans) {
        e.setColor("RED")
    }
    guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" })
    .then(entry => {
        if (entry.entries.first().target.id != 481489864626536458) return
        e.addField("invites by:", entry.entries.first().executor.tag + " (" + entry.entries.first().executor.id + ")")
        ch.send(e)
    })
    
    
})




client.on('message', message => {
    let prefix = client.config.get(message.guild.id + ".prefix")
    if (!prefix) { 
      prefix = "e!"
    } 
    const ch = client.channels.cache.find(e => e.id == 605698279975419904)
    client.squeue = client.queue.get(message.guild.id)
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    
    if (!command) return;
    if (command && client.blacklist.has(message.author.id) && message.author.id != 445234723590242304) return message.reply("you are inside the bot's blacklist, you can go to the support server and do an appeal if you want yourself removed from it")
    if (command.ownerOnly && message.author.id != 445234723590242304) return message.reply("only the owner can use this command")
    if (command.nsfwOnly && !message.channel.nsfw) return message.reply("this is nsfw channels only")
    if (command.permission && !message.member.hasPermission(command.permission)) return message.channel.send(`you dont have permissions to use this command`)
    if (message.channel.type == 'dm') return message.reply('y u tryina use these commands in dm')
    if (command.hidden) return
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = command.cooldown * 1000
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        const smth =expirationTime - now
        let totalSeconds = (smth / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        if (now < expirationTime) {
            return message.reply(`Please wait for ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        command.execute(client, message, args);
    } catch (error) {

        const e = new Discord.RichEmbed().setTitle("some error appeared")
        .addField("server:", message.guild.name)
        .addField("author:", message.author.tag)
        .addField("channel:", message.channel.name)
        .addField("error:", error)
        .addField("command:", message.content)
        ch.send(e)
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on("message", message => {
    if (!client.config.has(message.guild.id + ".blacklist")) return
    for (let i in client.config.get(message.guild.id)) {
        let smth = client.config.get(message.guild.id)[i]

        if (message.content.includes(smth)) {
            message.delete()
            message.reply("you have sent a blacklisted word, watch what you're sending!").then(msg => {
                msg.delete({timeout: 10000})
            })
            break
        }
    }
})

client.on("message", message => {
    let prefix = client.config.get(message.guild.id + ".prefix")
    if (!prefix) {
      prefix = "e!"
    } 
    const mention = message.mentions.members.first()
    let id;
    if (mention) {
      id = mention.id
    } else {
      id = 69
    }
    if (message.content.startsWith("<@!" + client.user.id + ">") || message.content.startsWith("@" + client.user.username) || message.content.startsWith("@" + client.user.tag) || message.content.startsWith("<@" + client.user.id + ">")) return message.channel.send("seems like you forgot my prefix for this server, so here it is: ```" + prefix + "```")
})


client.on("guildMemberAdd", member => {
  if (member.guild.id == client.db1.get(`${member.guild.id}.id`)) {
    if (client.db1.has(`${member.guild.id}.role`)) {
      member.roles.add(client.db1.get(`${member.guild.id}.role`));
    }
      let pre = client.db1.get(`${member.guild.id}.message`);
      let pre1 = pre.replace("{guild}", member.guild.name);
      let pre2 = pre1.replace("{mention}", `<@${member.id}>`);
      let pre3 = pre2.replace("{tag}", member.user.tag);
      let pre4 = pre3.replace("{count}", member.guild.members.cache.size);
      let pre6 = pre4.replace("{member}", member.user.username);
      member.guild.channels.cache
        .find(m => m.id == client.db1.get(`${member.guild.id}.channel`))
        .send(pre6);

  } else {
    return
  }
});

client.on("guildMemberRemove", member => {
  if (member.guild.id == client.db2.get(`${member.guild.id}.id`)) {
    try {
      let pre = client.db2.get(`${member.guild.id}.message`);
      let pre1 = pre.replace("{guild}", member.guild.name);
      let pre3 = pre1.replace("{tag}", member.user.tag);
      let pre4 = pre3.replace("{count}", member.guild.members.cache.size);
      let pre6 = pre4.replace("{member}", member.user.username);
      return client.channels.cache
        .find(m => m.id == client.db2.get(`${member.guild.id}.channel`))
        .send(pre6);
    } catch (error) {
      throw error
    }
  } else {
    return;
  }
});

client.on("guildMemberRemove", member => {
  const id = client.config.get(member.guild.id + ".logs")
  const ch = member.guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  try { 
  member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" })
  .then(entry => {
    if (entry.entries.first().target.id !== member.id || entry.entries.first().target.executor == client.user) return
    const reason = entry.entries.first().reason
    const e = new Discord.RichEmbed().setTitle("a member got kicked:")
    .addField("member:", entry.entries.first().target.tag)
    .addField("by:", entry.entries.first().executor.tag)
    .addField("reason:", !reason ? "No reason" : reason)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)    
    })
  } catch(error) {console.log(error)}
});

client.on("guildBanAdd", (guild, user)=> {
  const id = client.config.get(guild.id + ".logs")
  const ch = guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  try {
  guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" })
  .then(entry => {
    if (entry.entries.first().target.id !== user.id || entry.entries.first().target.executor == client.user) return
    const reason = entry.entries.first().reason
    const e = new Discord.RichEmbed().setTitle("a member got banned:")
    .addField("member:", entry.entries.first().target.tag)
    .addField("by:", entry.entries.first().executor.tag)
    .addField("reason:", !reason ? "No reason" : reason)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)    
    })
  } catch(error) {console.log(error)}
});

client.on("guildBanRemove", (guild, user)=> {
  const id = client.config.get(guild.id + ".logs")
  const ch = guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  try {
  guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_REMOVE" })
  .then(entry => {
    if (entry.entries.first().target.id !== user.id || entry.entries.first().target.executor == client.user) return
    const reason = entry.entries.first().reason
    const e = new Discord.RichEmbed().setTitle("a member got unbanned:")
    .addField("member:", entry.entries.first().target.tag)
    .addField("by:", entry.entries.first().executor.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)    
    })
  } catch(error) {console.log(error)}
});

client.on("messageDelete", message => {
  const id = client.config.get(message.guild.id + ".logs")
  const ch = message.guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  const deleter = message.author.tag
  if (!message.content) return
  const e = new Discord.RichEmbed().setTitle("a message got deleted:")
      .addField("author:", message.author.tag)
      .addField("message content:", message.content)
      .addField("message's channel:", "<#" + message.channel.id + ">")
      .setColor("GOLD")
      .setTimestamp();
  ch.send(e)
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  const id = client.config.get(oldMessage.guild.id + ".logs")
  const ch = oldMessage.guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  if (oldMessage == newMessage) return
  try {const e = new Discord.RichEmbed().setTitle("a message got edited:")
      .addField("author:", oldMessage.author.tag)
      .addField("old content:", oldMessage.content)
      .addField("new content:", newMessage.content)
      .addField("message's channel:", "<#" + oldMessage.channel.id + ">")
      .setColor("GOLD")
      .setTimestamp();
  ch.send(e)} catch (error) {
    return
  }
});

client.on("roleCreate", role=> {
  const id = client.config.get(role.guild.id + ".logs")
  const ch = role.guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  try {
  role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" })
  .then(entry => {
    const reason = entry.entries.first().reason
    const e = new Discord.RichEmbed().setTitle("a role got created:")
    .addField("by:", entry.entries.first().executor.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)    
    })
  } catch(error) {console.log(error)}
});

client.on("roleDelete", role=> {
  const id = client.config.get(role.guild.id + ".logs")
  const ch = role.guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  try {
  role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" })
  .then(entry => {
    const reason = entry.entries.first().reason
    const e = new Discord.RichEmbed().setTitle("a role got deleted:")
    .addField("role:", role.name)
    .addField("by:", entry.entries.first().executor.tag)
    .setColor("GOLD")
    .setTimestamp()
    ch.send(e)    
    })
  } catch(error) {console.log(error)}
});

client.on("roleUpdate", (oldRole, newRole)=> {
  const id = client.config.get(newRole.guild.id + ".logs")
  const ch = newRole.guild.channels.cache.find(m => m.id == id)
  if (!ch) return
  if (oldRole.name == newRole.name) return
  try {
  newRole.guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" })
  .then(entry => {
    const reason = entry.entries.first().reason
    const e = new Discord.RichEmbed().setTitle("a role got updated:")
    .addField("old name:", oldRole.name)
    .addField("new name:", newRole.name)
    .addField("by:", entry.entries.first().executor.tag)
    .setColor("GOLD")
    .setTimestamp()
    return ch.send(e)
    })
  } catch(error) {console.log(error)}
});


client.login("NDgxNDg5ODY0NjI2NTM2NDU4.Xm6Yew.s8qpL6s4lxc_DGZ-glyL87WzRmw")