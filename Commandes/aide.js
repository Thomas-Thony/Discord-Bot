const {Discord, EmbedBuilder, User} = require('discord.js')
module.exports = {
    name: "aide",
    description: "Donne le panneau de commande du bot",
    category: "Informations",
    permission: "aucune",
    dm: false,

    async run(bot , message, args){
    const embed = new EmbedBuilder()     
        .setTitle("Clan Chill")
        .setDescription("Affiche toutes les commandes du bot")
        .setThumbnail("https://cdn.icon-icons.com/icons2/272/PNG/512/Settings_30027.png")
        .setColor("Red")
        .setFooter({text:"Bot not found",  iconURL: bot.user.displayAvatarURL() })
        .setFields(
            {
                name: "Commandes",
                value: "Voici la liste des commandes:", value: "\n **aide** : Affiche la totalité des commandes.\n **ping** : Renvoie la latence du bot.\n **invite** : Permet de nous rejoindre sur Clash of Clans.\n **ban** : Banni une personne (Admins uniquement !).\n **unban** : Débanni une personne (Admins uniquement !) ",
            }
        )
        .setTimestamp()
       message.reply({embeds: [embed] }); 
    
  }
}