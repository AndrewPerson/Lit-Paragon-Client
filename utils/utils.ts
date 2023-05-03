export function skipEnd<T>(arr: T[], n: number = 1) {
    return arr.slice(0, arr.length - n);
}
