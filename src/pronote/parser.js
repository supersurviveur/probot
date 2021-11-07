exports.parseDate = (interaction) => {
    let date = null
    if (interaction.options.getString("date")) {
        let dateString = interaction.options.getString("date")
        if (dateString.includes("/")) {
            let split = dateString.split("/")
            if (split.length == 3) {
                year = split[2]
            } else {
                year = new Date().getFullYear()
            }
            let [day, month] = split
            day = parseInt(day)
            month = parseInt(month)
            if (day < 10) day = `0${day}`
            if (month < 10) month = `0${month}`
            date = new Date(`${year}-${month}-${day}T00:00:00.000Z`)

        }
    }
    if (!date || isNaN(date.getTime())) {
        year = new Date().getFullYear()
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        if (day < 10) day = `0${day}`
        if (month < 10) month = `0${month}`
        date = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
    }
    return date
}