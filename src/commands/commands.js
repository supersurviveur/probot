const { SlashCommandBuilder } = require('@discordjs/builders')
const commandsBuilder = require("./commandsBuilder.js")

exports.loadCommands = async (client) => {
    const commands = []
    //load Homeworks command
    commands.push(
        new SlashCommandBuilder()
            .setName('homeworks')
            .setDescription('Affiche les devoirs donnés pour la date donnée')
            .addStringOption(option =>
                option.setName('date')
                    .setDescription('Date des devoirs (optionnel) format: dd/mm/yyyy')
                    .setRequired(false))
            .toJSON()
    )

    //load EDT command
    commands.push(
        new SlashCommandBuilder()
            .setName('edt')
            .setDescription('Affiche le\'EDT pour la date donnée')
            .addStringOption(option =>
                option.setName('date')
                    .setDescription('Date de l\'EDT (optionnel) format: dd/mm/yyyy')
                    .setRequired(false))
            .toJSON()
    )

    //load average command
    commands.push(
        new SlashCommandBuilder()
            .setName('average')
            .setDescription('Affiche ta moyenne')
            .toJSON()
    )

    //load classAverage command
    commands.push(
        new SlashCommandBuilder()
            .setName('class-average')
            .setDescription('Affiche la moyenne générale de ta classe')
            .toJSON()
    )

    await commandsBuilder.addCommands(client, commands)
}