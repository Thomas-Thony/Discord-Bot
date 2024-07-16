const {Discord, EmbedBuilder, User} = require('discord.js')
module.exports = {
    name: "invite",
    description: "Donne le lien d'invitation du clan",
    category: "Informations",
    permission: "aucune",
    dm: false,

    async run(bot , message, args){
    const embed = new EmbedBuilder()     
        .setTitle("Clan Chill")
        .setDescription("Génere le lien d'invitation du clan .")
        .setThumbnail("https://api-assets.clashofclans.com/badges/512/E0YDzjP0GAZIi4KQYmN_uYzv6KBizBfnDWJG9_v8aqM.png" )
        .setColor("Red")
        .setFooter({text:"Bot not found",  iconURL: bot.user.displayAvatarURL() })
        .setImage("https://e0.pxfuel.com/wallpapers/486/308/desktop-wallpaper-500fg-for-the-best-clash-of-clan-banner-sig-2560x1440-clash-of-clans.jpg")
        .setFields(
            {
                name: "Viens nous rejoindre",
                value: "https://link.clashofclans.com/fr?action=OpenClanProfile&tag=2QYLPG2RG",
            }
        )
        .setTimestamp()
       message.reply({embeds: [embed] }); 
    
  }
}