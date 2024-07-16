const { Embed } = require("discord.js");
const client = require('clashofclans.js');

async function infoclan() {
    try {
        await client.login(process.env.API);
        const clan = await client.getClan(`#${process.env.TAGCLAN}`);
        return clan;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    name: "clan",
    description: "Les information du clan ",

    run: async (client, interaction) => {
        const clan = await infoclan();
        if (!clan || !clan.name) {
            return interaction.followUp("Une erreur s'est produite lors de la recherche du clan ou les données du clan sont manquantes.");
        }

        const typeclan = clan.type === 'inviteOnly' ? 'Invitation uniquement' : clan.type;

        const embed = new Embed()
            .setColor("#FF0000")
            .setTitle(`${clan.name} (${clan.tag})`)
            .setDescription(`**Description du clan :** \n${clan.description}`)
            .addFields(
                { name: 'Langue du clan', value: `${clan.location.name}`, inline: true },
                { name: 'Niveau du clan', value: `${clan.clanLevel}`, inline: true },
                { name: 'Nombre de membres', value: `${clan.members}`, inline: true },
                { name: 'Nombre de trophées', value: `${clan.clanPoints}`, inline: true },
                { name: 'Nombre de guerres gagnées', value: `${clan.warWins}`, inline: true },
                { name: 'Nombre de guerres perdues', value: `${clan.warLosses}`, inline: true },
                { name: 'Nombre de guerres nulles', value: `${clan.warTies}`, inline: true },
                { name: 'Nombre de guerres gagnées consécutives', value: `${clan.warWinStreak}`, inline: true },

                { name: 'Nombre de Trophées requis', value: `${clan.requiredTrophies} <:trophy:1160400634177126552>`, inline: true },
                { name : 'HDV requis', value: `${clan.requiredTownhallLevel} <:TH_07:1160400878000423035>`, inline: false },

                {name : 'Comment rejoindre le clan', value: `Le clan est actuellement en : **${typeclan}** , pour rejoindre veuillez faire **__/recrutement__**`, inline: false},

            )
            .setThumbnail(`${clan.badgeUrls.medium}`)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
    },
};
