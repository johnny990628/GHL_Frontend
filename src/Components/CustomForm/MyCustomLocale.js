const myCustomLocale = {
    // months list by order
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],

    // week days by order
    weekDays: [
        {
            name: '星期日', // used for accessibility
            short: '日', // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
        },
        {
            name: '星期一',
            short: '一',
        },
        {
            name: '星期二',
            short: '二',
        },
        {
            name: '星期三',
            short: '三',
        },
        {
            name: '星期四',
            short: '四',
        },
        {
            name: '星期五',
            short: '五',
        },
        {
            name: '星期六',
            short: '六',
            isWeekend: true,
        },
    ],
    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day)
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate()
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit
    },

    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    // for input range value
    from: 'from',
    to: 'to',

    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
}
export default myCustomLocale
