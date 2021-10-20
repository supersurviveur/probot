const { Interaction } = require("discord.js")
const { average, classAverage } = require("./../pronote/note/average.js")
const { homeworks, homeworksButtons } = require("./../pronote/homeworks/homeworks.js")
const { edt, edtButtons } = require("./../pronote/edt/edt.js")

/**
 * 
 * @param {Interaction} interaction 
 * @returns 
 */
exports.onInteraction = async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.component.customId.includes("Homeworks")){
            homeworksButtons(interaction)
        } else if (interaction.component.customId.includes("Edt")){
            edtButtons(interaction)
        }
    }
    if (!interaction.isCommand()) {
        return
    }
    const { commandName, options } = interaction
    switch (commandName) {
        case "average":
            average(interaction)
            break
        case "class-average":
            classAverage(interaction)
            break
        case "homeworks":
            homeworks(interaction)
            break
        case "edt":
            edt(interaction)
            break

        default:
            break
    }
}