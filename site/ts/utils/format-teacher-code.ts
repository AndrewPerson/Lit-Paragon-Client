export function FormatTeacherCode(code: string) {
    if (code.length == 0) return "";
    if (code.length == 1) return code.toUpperCase();
    if (code.length == 2) return `${code[0].toUpperCase()} ${code[1].toUpperCase()}`;

    return `${code[0].toUpperCase()} ${code[1].toUpperCase()}${code.substring(2).toLowerCase()}`;
}