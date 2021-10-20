const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Interaction, CommandInteraction, ButtonInteraction } = require("discord.js")
const pronote = require("./../pronote.js")
const parser = require("./../parser.js")
const DAYS = ["DIMANCHE", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"]

/**
 * 
 * @param {Interaction} interaction 
 * @param {Date} date 
 * @returns {[MessageEmbed[], MessageAttachment, MessageActionRow]}
 */
const generateEmbeds = async (interaction, date, userId, username) => {
    let homeworkDate = new Date(date)
    homeworkDate.setDate(homeworkDate.getDate() - 1)

    const session = await pronote.createSession(userId)
    console.log(session.)
    const homeworks = await session.homeworks(homeworkDate)

    const attachment = new MessageAttachment('./assets/logo.png', 'logo.png')
    const embeds = []
    let files = []
    let hFor = {
        day: DAYS[date.getUTCDay()],
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    if (hFor.date < 10) hFor.date = `0${hFor.date}`
    if (hFor.month < 10) hFor.month = `0${hFor.month}`
    if (homeworks.length > 0) {
        let i = 0
        embeds.push(new MessageEmbed()
            .setColor('#217649')
            .setTitle(`DEVOIRS POUR LE ${hFor.day} ${hFor.date}/${hFor.month}/${hFor.year}`)
            .setDescription(`${username}:||${userId}||`)
            .setThumbnail('attachment://logo.png'))
        for (let homework of homeworks) {
            files = files.concat(homework.files)
            const embed = new MessageEmbed()
                .setColor(homework.color)
                .setTitle(homework.subject)
                .setDescription(`${homework.description}\n\n${homework.done ? ":green_square: FAIT" : ":red_square: NON FAIT"}`)
            if (homework.files.length > 0) embed.setDescription(`${embed.description}\n`)
            homework.files.forEach(file => {
                embed.setDescription(`${embed.description}\n**Fichier:** ${file.name}`)
            })
            if (i + 1 == homeworks.length) embed.setTimestamp()
            embeds.push(embed)
            i++
        }
    } else {
        embeds.push(new MessageEmbed()
            .setColor('#217649')
            .setTitle(`AUCUN DEVOIRS POUR LE ${hFor.day} ${hFor.date}/${hFor.month}/${hFor.year}`)
            .setDescription(`${username}:||${userId}||`)
            .setThumbnail('attachment://logo.png'))
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('previousWeekHomeworks')
                .setStyle('SECONDARY')
                .setLabel('previous week')
                .setEmoji('⏪')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('previousDayHomeworks')
                .setStyle('SECONDARY')
                .setLabel('previous day')
                .setEmoji('◀️')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('nextDayHomeworks')
                .setStyle('SECONDARY')
                .setLabel('next day')
                .setEmoji('▶️')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('nextWeekHomeworks')
                .setStyle('SECONDARY')
                .setLabel('next week')
                .setEmoji('⏩')
        )
    if (files.length >= 1) {
        const links = new MessageActionRow()
        files.forEach(file => {
            links.addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setURL(file.url)
                    .setLabel(file.name)
                    .setEmoji('📁')
            )
        })
        return [embeds, attachment, [row, links]]
    }
    return [embeds, attachment, [row]]
}
/**
 * 
 * @param {CommandInteraction} interaction 
 * @return
 */
exports.homeworks = async (interaction) => {
    await interaction.deferReply()
    let date = parser.parseDate(interaction)
    const [embeds, attachment, row] = await generateEmbeds(interaction, date, interaction.user.id, interaction.member.displayName)

    interaction.editReply({ embeds: embeds, files: [attachment], components: row })
}

/**
 * 
 * @param {ButtonInteraction} interaction 
 * @return
 */
exports.homeworksButtons = async (interaction) => {
    interaction.deferUpdate()
    let title = interaction.message.embeds[0].title.split(" ")
    let [day, month, year] = title[title.length - 1].split("/")
    let date = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
    switch (interaction.component.customId) {
        case "previousWeekHomeworks":
            date.setDate(date.getDate() - 7)
            break
        case "previousDayHomeworks":
            date.setDate(date.getDate() - 1)
            break
        case "nextWeekHomeworks":
            date.setDate(date.getDate() + 7)
            break
        case "nextDayHomeworks":
            date.setDate(date.getDate() + 1)
            break

        default:
            break
    }

    let userId = interaction.message.embeds[0].description.split(":")[1].replaceAll("|", "")
    let username = interaction.message.embeds[0].description.split(":")[0]
    const [embeds, attachment, row] = await generateEmbeds(interaction, date, userId, username)
    interaction.editReply({ embeds: embeds, components: row })
}