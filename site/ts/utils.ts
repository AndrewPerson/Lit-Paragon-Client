export function Debounce(this: unknown, func: (...args: any[]) => void, timeout: number) {
    let timer: number;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}