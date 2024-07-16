const Discord = require('discord.js')
module.exports =  async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete){
        let entry = interaction.options.getFocused()
        if(interaction.commandName === "claninfo"){
            
            let choices = ["membre", "guerre", "general"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c=> ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))

            //let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            //await interaction.respond(entry === ""? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand){
        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }
}