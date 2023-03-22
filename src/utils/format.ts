import moment from "moment-with-locales-es6";

export function formatDate(date: Date | string) {
    return moment(date).utc().format('l')
}

export function formatDateTime(date: Date | string) {
    return moment(date).utc().locale('es').format('lll')
}
