const Discord = require('discord.js');
module.exports = {
    name: "unban",
    description: "Débannir une personne",
    category: "Administration",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    option: [
        {
            type: "user",
            name: "membre",
            description:"le membre à débannir",
            category: "Modération",
            require: true,
        },{
            type: "string",
            name: "raison",
            description:"La raison du débannissement",
            required: false,
        }
    ],

    async run(bot, message, args){
        try{
            let user = args.getUser("utilisateur")
            if(!user) return message.reply("Pas d'utilisateur")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if((await message.guild.bans.fetch(user.id).size <= 0)) return message.reply("Cet utilisateur n'est pas banni !")

            try{await user.send(`Tu as été débanni par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {
                await message.reply(`${message.user} a débanni ${user.tag} pour la raison : \`${reason}\``)

                await message.guild.members.unban(user, reason)
            }
        }
     catch (err){
        return message.reply("Pas d'utilisateur .")
    }
  }
}