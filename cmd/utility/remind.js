module.exports = {
  name:"remind",
  aliases: ["remindme", "rm"],
  usage: "<time> <reason (its defaulted to 'some reason')>",
  module:"utility",
  description: "reminds u after the time u specified it to remind u",
  execute: (client, message, args) => {
    const time = args[0]
    let reason = args.join(" ").replace(time, "")
    if (!reason) reason = "some reason"
    if (!time) {
      return message.reply("you forgot to add how much time till i remind u")
    }
    if (!isNaN(time)) {
      message.reply("ok ima remind you after " + time + "s for the reason:\n" + reason)
      const seconds = Math.floor(time * 1000)
      if (isNaN(seconds)) return message.reply("that not a valid time argument")
      client.setTimeout(() => message.reply("now its time to remind u m8:\n" + message.url), seconds)
    }
    if (time.endsWith("s")) {
      message.reply("ok ima remind you after " + time + " for the reason:\n" + reason)
      const seconds = Math.floor(time.replace("s", "") * 1000)

      if (isNaN(seconds)) return message.reply("that not a valid time argument")
      client.setTimeout(() => message.reply("now its time to remind u m8:\n" + message.url), seconds)
    }
    if (time.endsWith("m")) {
      message.reply("ok ima remind you after " + time + " for the reason:\n" + reason)
      const seconds = Math.floor(time.replace("m", "") * 1000 * 60)

      if (isNaN(seconds)) return message.reply("that not a valid time argument")
      client.setTimeout(() => message.reply("now its time to remind u m8:\n" + message.url), seconds)
    }
    if (time.endsWith("h")) {
      message.reply("ok ima remind you after " + time + " for the reason:\n" + reason)
      const seconds = Math.floor(time.replace("h", "") * 1000 * 60 * 60)

      if (isNaN(seconds)) return message.reply("that not a valid time argument")
      client.setTimeout(() => message.reply("now its time to remind u m8:\n" + message.url), seconds)
    }
    if (time.endsWith("d")) {
      message.reply("ok ima remind you after " + time + " for the reason:\n" + reason)
      const seconds = Math.floor(time.replace("d", "") * 1000 * 60 * 60 * 24)

      if (isNaN(seconds)) return message.reply("that not a valid time argument")
      client.setTimeout(() => message.reply("now its time to remind u m8:\n" + message.url), seconds)
    }
    if (time.endsWith("w")) {
      message.reply("ok ima remind you after " + time + " for the reason:\n" + reason)
      const seconds = Math.floor(time.replace("w", "") * 1000 * 60 * 60 * 24 * 7)

      if (isNaN(seconds)) return message.reply("that not a valid time argument")
      client.setTimeout(() => message.reply("now its time to remind u m8:\n" + message.url), seconds)
    }
  }
}