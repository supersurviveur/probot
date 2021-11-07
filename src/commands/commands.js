const { SlashCommandBuilder } = require('@discordjs/builders')
const commandsBuilder = require("./commandsBuilder.js")

exports.loadCommands = async (client) => {
    const commands = []
    //load Register command
    commands.push(
        new SlashCommandBuilder()
            .setName('register')
            .setDescription('Permet de renseigner vos identifiants')
            .addStringOption(option =>
                option.setName('username')
                    .setDescription('Votre nom d\'utilisateur')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('password')
                    .setDescription('Votre mot de passe')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('url')
                    .setDescription('L\'url de votre établissement (ex: "https://0382270l.index-education.net/pronote/")')
                    .setRequired(true))
            .toJSON()
    )

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