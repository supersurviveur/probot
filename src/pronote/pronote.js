const pronote = require('@dorian-eydoux/pronote-api')
const fs = require("fs")

/**
 * 
 * @param {String} userId
 * @returns {pronote.PronoteStudentSession} A session with all students infos
 */
exports.createSession = async (userId) => {
    return new Promise((resolve, reject) => {
        fs.readFile("./json/pronoteUser.json", async (err, file) => {
            const data = JSON.parse(file)
            const user = data[userId]
            const session = await pronote.login(user.url, user.username, user.password).catch(err => {
                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    console.error('Mauvais identifiants');    
                } else {
                    console.error(err);
                }
                reject(err)
            })
            resolve(session)
        })
    })
}