export function FormatClassName(name: string) {
    return name.split(" ").filter(word => (isNaN(parseFloat(word)) && word.length > 1) || word =="&").join(" ");
}