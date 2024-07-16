const Discord = require('discord.js')
module.exports = {
    name: "ban",
    description: "Bannir une personne",
    category: "Administration",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    option: [
        {
            type: "user",
            name: "membre",
            description:"le membre à bannir",
            required: true,
        },{
            type: "string",
            name: "raison",
            description:"La raison du bannissement",
            required: false,
        }
    ],

    async run(bot, message, args){
        try{
        let user = await bot.users.fetch(args._hoistedOption[0].value)
        if(!user) return message.reply("Pas de membre à bannir !")
        let member = message.guild.members.cache.get(user.id)
        let reason = args.get("raison").value;
        if(!reason) reason = "Pas de raison fournie";

        if(message.user.id === user.id) return message.reply("Essaie pas de te bannir enfin !")
        if((await message.guild.fetchOwner()).id === message.user.id) return message.reply("Ne ban pas le propriétaire du serveur !")
        if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir cette personne !")
        if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni ")

        try{await user.send(`Tu as été banni de ce serveur ${message.guild.name} pour la raison suivante : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a banni ${user.tag} pour la raison suivante: \`${reason}\``)

        await message.guild.bans.create(user.id, {reason: reason});

    } catch (err){

            return message.reply("Pas de membre à bannir !")
        }
    }
}