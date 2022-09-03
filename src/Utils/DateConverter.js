export const addDays = (day, add) => {
    var date = new Date(day)
    date.setDate(date.getDate() + add)
    return date
}
