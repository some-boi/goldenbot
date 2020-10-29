const {RichEmbed} = require("discord.js")
module.exports = {
  name:"permission_flags",
  module:"owner",
  ownerOnly:true,
  aliases: ["permissionflags", "pf", "permission_f", "permissionf", "p_flags", "pflags"],
  execute:(client, message, args) => {
    const e = new RichEmbed().setTitle("permission flags:")
    .setDescription(
`
\`ADMINISTRATOR\` (implicitly has all permissions, and bypasses all channel overwrites)
\`CREATE_INSTANT_INVITE\` (create invitations to the guild)
\`KICK_MEMBERS\`
\`BAN_MEMBERS\`
\`MANAGE_CHANNELS\` (edit and reorder channels)
\`MANAGE_GUILD\` (edit the guild information, region, etc.)
\`ADD_REACTIONS\` (add new reactions to messages)
\`VIEW_AUDIT_LOG\`
\`PRIORITY_SPEAKER\`
\`STREAM\`
\`VIEW_CHANNEL\`
\`READ_MESSAGES\` (deprecated)
\`SEND_MESSAGES\`
\`SEND_TTS_MESSAGES\`
\`MANAGE_MESSAGES\` (delete messages and reactions)
\`EMBED_LINKS\` (links posted will have a preview embedded)
\`ATTACH_FILES\`
\`READ_MESSAGE_HISTORY\` (view messages that were posted prior to opening Discord)
\`MENTION_EVERYONE\`
\`USE_EXTERNAL_EMOJIS\` (use emojis from different guilds)
\`EXTERNAL_EMOJIS\` (deprecated)
\`CONNECT\` (connect to a voice channel)
\`SPEAK\` (speak in a voice channel)
\`MUTE_MEMBERS\` (mute members across all voice channels)
\`DEAFEN_MEMBERS\` (deafen members across all voice channels)
\`MOVE_MEMBERS\` (move members between voice channels)
\`USE_VAD\` (use voice activity detection)
\`CHANGE_NICKNAME\`
\`MANAGE_NICKNAMES\` (change other members' nicknames)
\`MANAGE_ROLES\`
\`MANAGE_ROLES_OR_PERMISSIONS\` (deprecated)
\`MANAGE_WEBHOOKS\`
\`MANAGE_EMOJIS\`
`
    )
    .setTimestamp()
    .setColor("GOLD")
    .setAuthor(message.author.tag, message.author.avatarURL)
    message.channel.send(e)

  }
}