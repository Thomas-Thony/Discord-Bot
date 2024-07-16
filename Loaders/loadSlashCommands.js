const Discord = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes} = require('discord.js')

module.exports = async bot => {
    let commands = [];
    
    bot.commands.forEach(async command => {
        let slashcommand = new Discord.SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === "aucune" ? null : command.permission)

        if(command.options?.lenght >= 1) {
            for (let i=0;i<command.options.length;i++) {
                if(command.options[i].type === "string") slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.lenght)}Option`](option => option.setName(command.option[i].name).setDescription(command.options[i].description).setAutocomplete(command.options[i].autocomplete).setRequired(command.options[i].required))
        }
    }
        await commands.push(slashcommand)
    });

    const rest = new REST({version: "10"}).setToken(bot.token)

    try {
        await rest.put(Routes.applicationCommands(bot.user.id), { body: commands });
        console.log("Les commandes slash ont été créées avec succès !");
    } catch (error) {
        console.error("Une erreur s'est produite lors de la création des commandes slash :", error);
    }
    
}