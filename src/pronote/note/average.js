const { MessageEmbed, MessageAttachment, Interaction } = require("discord.js")
const pronote = require("./../pronote.js")

/**
 * 
 * @param {Interaction} interaction 
 * @return
 */
exports.average = async (interaction) => {
    const session = await pronote.createSession(interaction.user.id)
    const marks = await session.marks()
    const attachment = new MessageAttachment('./assets/logo.png', 'logo.png');
    const embed = new MessageEmbed()
	.setColor('#217649')
	.setTitle(`Moyenne générale de ${interaction.user.username}`)
	.setDescription(`Moyenne: \`${marks.averages.student}\``)
	.setThumbnail('attachment://logo.png')
	.setTimestamp()
    interaction.reply({embeds: [embed], files: [attachment]})
}

/**
 * 
 * @param {Interaction} interaction 
 * @return
 */
exports.classAverage = async (interaction) => {
    const session = await pronote.createSession(interaction.user.id)
    const marks = await session.marks()
    const attachment = new MessageAttachment('./assets/logo.png', 'logo.png');
    const embed = new MessageEmbed()
	.setColor('#217649')
	.setTitle(`Moyenne générale de la classe de ${interaction.user.username}`)
	.setDescription(`Moyenne: \`${marks.averages.studentClass}\``)
	.setThumbnail('attachment://logo.png')
	.setTimestamp()
    interaction.reply({embeds: [embed], files: [attachment]})
}