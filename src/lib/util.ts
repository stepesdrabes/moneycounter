import * as twemoji from "twemoji"

export const formatRelativeDate = (date: Date): string => {
    let diff: number = new Date().getTime() - date.getTime()
    let sec: number = Math.floor(diff / 1000)
    let min: number = Math.floor(diff / 60000)
    let hour: number = Math.floor(diff / 3600000)

    if (diff < 1000) return 'right now'
    if (sec < 60) return sec + ' sec ago';
    if (min < 60) return min + ' min ago';
    if (hour < 24) return hour + ' h ago';

    let d: Date = date
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes())

    const formattedDate: string[] = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2))

    return formattedDate.slice(0, 3).join('.') + ' ' + formattedDate.slice(3).join(':')
}

export const getFlagEmoji = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt(0)))

export const convertToTwemoji = (emoji: string) => twemoji.default.parse(emoji)