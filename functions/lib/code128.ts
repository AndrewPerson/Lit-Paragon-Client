export const charValueToPatternMap = [
    [2,1,2,2,2,2], [2,2,2,1,2,2], [2,2,2,2,2,1], [1,2,1,2,2,3], [1,2,1,3,2,2],
    [1,3,1,2,2,2], [1,2,2,2,1,3], [1,2,2,3,1,2], [1,3,2,2,1,2], [2,2,1,2,1,3],
    [2,2,1,3,1,2], [2,3,1,2,1,2], [1,1,2,2,3,2], [1,2,2,1,3,2], [1,2,2,2,3,1],
    [1,1,3,2,2,2], [1,2,3,1,2,2], [1,2,3,2,2,1], [2,2,3,2,1,1], [2,2,1,1,3,2],
    [2,2,1,2,3,1], [2,1,3,2,1,2], [2,2,3,1,1,2], [3,1,2,1,3,1], [3,1,1,2,2,2],
    [3,2,1,1,2,2], [3,2,1,2,2,1], [3,1,2,2,1,2], [3,2,2,1,1,2], [3,2,2,2,1,1],
    [2,1,2,1,2,3], [2,1,2,3,2,1], [2,3,2,1,2,1], [1,1,1,3,2,3], [1,3,1,1,2,3],
    [1,3,1,3,2,1], [1,1,2,3,1,3], [1,3,2,1,1,3], [1,3,2,3,1,1], [2,1,1,3,1,3],
    [2,3,1,1,1,3], [2,3,1,3,1,1], [1,1,2,1,3,3], [1,1,2,3,3,1], [1,3,2,1,3,1],
    [1,1,3,1,2,3], [1,1,3,3,2,1], [1,3,3,1,2,1], [3,1,3,1,2,1], [2,1,1,3,3,1],
    [2,3,1,1,3,1], [2,1,3,1,1,3], [2,1,3,3,1,1], [2,1,3,1,3,1], [3,1,1,1,2,3],
    [3,1,1,3,2,1], [3,3,1,1,2,1], [3,1,2,1,1,3], [3,1,2,3,1,1], [3,3,2,1,1,1],
    [3,1,4,1,1,1], [2,2,1,4,1,1], [4,3,1,1,1,1], [1,1,1,2,2,4], [1,1,1,4,2,2],
    [1,2,1,1,2,4], [1,2,1,4,2,1], [1,4,1,1,2,2], [1,4,1,2,2,1], [1,1,2,2,1,4],
    [1,1,2,4,1,2], [1,2,2,1,1,4], [1,2,2,4,1,1], [1,4,2,1,1,2], [1,4,2,2,1,1],
    [2,4,1,2,1,1], [2,2,1,1,1,4], [4,1,3,1,1,1], [2,4,1,1,1,2], [1,3,4,1,1,1],
    [1,1,1,2,4,2], [1,2,1,1,4,2], [1,2,1,2,4,1], [1,1,4,2,1,2], [1,2,4,1,1,2],
    [1,2,4,2,1,1], [4,1,1,2,1,2], [4,2,1,1,1,2], [4,2,1,2,1,1], [2,1,2,1,4,1],
    [2,1,4,1,2,1], [4,1,2,1,2,1], [1,1,1,1,4,3], [1,1,1,3,4,1], [1,3,1,1,4,1],
    [1,1,4,1,1,3], [1,1,4,3,1,1], [4,1,1,1,1,3], [4,1,1,3,1,1], [1,1,3,1,4,1],
    [1,1,4,1,3,1], [3,1,1,1,4,1], [4,1,1,1,3,1]
];

export const startCodeAPattern = [2,1,1,4,1,2];
export const stopCodePattern = [2,3,3,1,1,1];

// Only does ASCII characters 33 - 95
export function charTo128Value(char: string) {
    const code = char.charCodeAt(0);

    return code - 32;
}

export function checkSum128(data: string, startCode: number) {
    let sum = startCode;
    for (var i = 0; i < data.length; i++) {
        sum += (i + 1) * charTo128Value(data[i]);
    }

    return sum % 103;
}

// Uses a subset of Code Set A. Only supports ASCII characters 33 - 95
// Returns widths of bars of barcode
export function encodeDigitsToCode128(text: string) {
    //Start code A has a value of 103
    const startCode = 103;

    const check = checkSum128(text, startCode);

    return [
        startCodeAPattern,
        text.split('').map(c => charValueToPatternMap[charTo128Value(c)]).flat(),
        charValueToPatternMap[check],
        stopCodePattern
    ].flat();
}

// Uses a subset of Code Set A. Only supports ASCII characters 33 - 95
export function encodeDigitsToCode128Svg(text: string) {
    const widths = encodeDigitsToCode128(text);

    let rects = [];
    let currentWidth = 0;
    let index = 0;
    for (let i = 0; i < widths.length; i++) {
        const width = widths[i];

        rects.push({
            x: currentWidth,
            width: width,
            colour: i % 2 == 0 ? "black" : "white"
        })

        currentWidth += width;
        index++;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${currentWidth} 100" prevserveAspectRatio="none">
        ${rects.map(rect => `<rect x="${rect.x}" y="0" width="${rect.width}" height="100" fill="${rect.colour}" />`).join('')}
    </svg>`;

    return svg;
}