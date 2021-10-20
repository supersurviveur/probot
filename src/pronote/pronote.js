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
// async function main()
// {
//     const session = await createSession("586254543650684938").catch(err => {
//         console.error(err)
//         return err
//     })
    
//     console.log(session.user.name); // Affiche le nom de l'élève
//     console.log(session.user.studentClass.name); // Affiche la classe de l'élève
    
//     const timetable = await session.timetable(new Date(2021, 09, 11)); // Récupérer l'emploi du temps d'aujourd'hui
//     const marks = await session.marks(); // Récupérer les notes du trimestre
//     console.log(`L'élève a ${timetable.length} cours aujourd'hui`); 
//     console.log(`et a pour l'instant une moyenne de ${marks.averages.student} ce trimestre.`);
    
//     // etc. les fonctions utilisables sont 'timetable', 'marks', 'contents', 'evaluations', 'absences', 
//     // 'homeworks', 'infos', et 'menu', sans oublier les champs 'user' et 'params' qui regorgent d'informations.
// }

// main()