const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs").promises;

/**
 * 
 * @param {CommandInteraction} interaction
 */
exports.register = async (interaction) => {
    let buffer = await fs.readFile('./json/pronoteUser.json')
    let users = JSON.parse(buffer)
    let id = interaction.member.user.id
    users[id] = {
        url: interaction.options.getString("url"),
        username: interaction.options.getString("username"),
        password: interaction.options.getString("password")
    }
    await fs.writeFile('./json/pronoteUser.json', JSON.stringify(users, null, 4))
    await interaction.reply({
        embeds: [
            new MessageEmbed()
                .setColor('#217649')
                .setTitle(`VOS IDENTIFIANTS ONT BIEN ÉTÉ ENREGISTRÉS`)
        ],
        ephemeral: true
    })
}