const { Client, Intents } = require('discord.js')
const config = require('./config.json')
const commands = require('./src/commands/commands.js')
const interaction = require('./src/interaction/interaction.js')

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.login(config.token)

client.once('ready', async () => {
    client.user.setActivity("pronote", { type: "WATCHING" })
    await commands.loadCommands(client)
    console.log('ProBot is ready!')
})

client.on('interactionCreate', async (e) => {
    await interaction.onInteraction(e)
})