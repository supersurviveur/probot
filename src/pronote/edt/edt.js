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

    const session = await pronote.createSession(userId)
    const timetable = await session.timetable(date)

    const attachment = new MessageAttachment('./assets/logo.png', 'logo.png')
    const embeds = []
    let hFor = {
        day: DAYS[date.getUTCDay()],
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    if (hFor.date < 10) hFor.date = `0${hFor.date}`
    if (hFor.month < 10) hFor.month = `0${hFor.month}`
    if (timetable.length > 0) {
        let i = 0
        embeds.push(new MessageEmbed()
            .setColor('#217649')
            .setTitle(`COURS LE ${hFor.day} ${hFor.date}/${hFor.month}/${hFor.year}`)
            .setDescription(`${username}:||${userId}||`)
            .setThumbnail('attachment://logo.png'))
        for (let cours of timetable) {
            let durationHours = cours.to.getHours()
            let durationMinutes = cours.to.getMinutes()
            if (durationMinutes < 10) durationMinutes = `0${durationMinutes}`
            console.log(cours, date)
            let hours = cours.from.getHours()
            let minutes = cours.from.getMinutes()
            if (hours < 10) hours = `0${hours}`
            if (minutes < 10) minutes = `0${minutes}`
            const embed = new MessageEmbed()
                .setColor(cours.color)
                .setTitle(`${hours}:${minutes} - ${durationHours}:${durationMinutes}`)
                .setDescription(`
                    **${cours.subject}**
                    __${cours.teacher}__
                    ${cours.room}
                `)
            if (i + 1 == timetable.length) embed.setTimestamp()
            embeds.push(embed)
            i++
        }
    } else {
        embeds.push(new MessageEmbed()
            .setColor('#217649')
            .setTitle(`AUCUN COURS LE ${hFor.day} ${hFor.date}/${hFor.month}/${hFor.year}`)
            .setDescription(`${username}:||${userId}||`)
            .setThumbnail('attachment://logo.png'))
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('previousWeekEdt')
                .setStyle('SECONDARY')
                .setLabel('previous week')
                .setEmoji('⏪')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('previousDayEdt')
                .setStyle('SECONDARY')
                .setLabel('previous day')
                .setEmoji('◀️')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('nextDayEdt')
                .setStyle('SECONDARY')
                .setLabel('next day')
                .setEmoji('▶️')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('nextWeekEdt')
                .setStyle('SECONDARY')
                .setLabel('next week')
                .setEmoji('⏩')
        )
    return [embeds, attachment, [row]]
}
/**
 * 
 * @param {CommandInteraction} interaction 
 * @return
 */
exports.edt = async (interaction) => {
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
exports.edtButtons = async (interaction) => {
    interaction.deferUpdate()
    let title = interaction.message.embeds[0].title.split(" ")
    let [day, month, year] = title[title.length - 1].split("/")
    let date = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
    switch (interaction.component.customId) {
        case "previousWeekEdt":
            date.setDate(date.getDate() - 7)
            break
        case "previousDayEdt":
            date.setDate(date.getDate() - 1)
            break
        case "nextWeekEdt":
            date.setDate(date.getDate() + 7)
            break
        case "nextDayEdt":
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