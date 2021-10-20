const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { Client } = require('discord.js')
const config = require("../../config.json")

/**
 * 
 * @param {Client} client 
 * @param {Array} commands 
 */
exports.addCommands = async (client, commands) => {
    // Save commands
    const rest = new REST({ version: '9' }).setToken(config.token);
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.appID, "726323752161378324"),
            { body: commands },
        )

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}