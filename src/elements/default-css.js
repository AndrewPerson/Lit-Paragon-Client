import { css } from "lit";

export const containerCss = css`
    :host {
        box-shadow: var(--surface-shadow) 0 0 1vmin;
        background-color: var(--surface2);
        border-radius: 2vmin;
    }
`;

export const imgCss = css`
    img {
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`;

export const textCss = css`
    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        font-weight: 100;
        color: var(--text1);
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    a {
        color: var(--text2);
        text-decoration: none;
    }
`;

export const buttonCss = css`
    button {
        border: none;
        background-color: var(--surface4);
        color: var(--text4);
        padding: 1vmin 2vmin;
        border-radius: calc(var(--font-size) / 2.5);
        max-width: max-content;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
        font-size: var(--font-size);
    }

    button:hover {
        background-color: var(--surface3);
        color: var(--text1);
    }

    button:active {
        color: var(--text3);
    }
`;

export const sliderCss = css`
    input[type=range] {
        appearance: none;
        width: calc(var(--font-size) * 7);
        background-color: var(--surface2);
        height: calc(var(--font-size) / 1.5);
        box-shadow: var(--surface-shadow) 0 0 2vmin;
        border-radius: calc(var(--font-size) / 2.5);
    }

    input[type=range]::-moz-range-thumb {
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
    }
`;

export const blockQuoteCss = css`
    blockquote {
        border-left: calc(var(--font-size) / 2) solid var(--surface4);
        margin: 0;
        padding-left: calc(var(--font-size) / 4 * 3);
    }
`;

export const selectCss = css`
    select {
        border: 1px solid var(--text2);
        background-color: var(--surface2);
        color: var(--text2);

        padding: 1vmin 0;
        padding-right: 6vmin;

        border-radius: 1vmin;

        max-width: max-content;

        font-size: calc(var(--font-size) / 1.2);
    }

    option {
        background-color: var(--surface2);
    }
`;