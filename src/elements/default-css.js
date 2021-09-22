import { css } from "lit";

export const containerCss = css`
    :host {
        box-shadow: var(--shadow);
        background-color: var(--surface2);
        border-radius: 2vmin;
    }
`;

export const fullContainerCss = css`
    :host {
        flex: 1;
        margin: 2vh 2%;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            max-height: calc(96vh - 12vw);
        }
    }
`;

export const imgCss = css`
    :where(img) {
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`;

export const textCss = css`
    :where(h1, h2, h3, h4, h5, h6, p) {
        margin: 0;
        font-weight: 100;
        color: var(--text1);
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    :where(a) {
        color: var(--text2);
        text-decoration: none;
    }
`;

export const buttonCss = css`
    :where(button) {
        border: none;
        background-color: var(--surface4);
        color: var(--text4);
        padding: 1vmin 2vmin;
        border-radius: calc(var(--font-size) / 2.5);
        max-width: max-content;
        box-shadow: var(--shadow);
        font-size: var(--font-size);
    }

    :where(button:hover) {
        background-color: var(--surface3);
        color: var(--text1);
    }

    :where(button:active) {
        color: var(--text3);
    }
`;

export const sliderCss = css`
    :where(input[type=range]) {
        appearance: none;
        width: calc(var(--font-size) * 7);
        background-color: var(--surface2);
        height: calc(var(--font-size) / 1.5);
        box-shadow: var(--shadow);
        border-radius: calc(var(--font-size) / 2.5);
    }

    :where(input[type=range])::-moz-range-thumb {
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
    }

    :where(input[type=range])::-webkit-slider-thumb {
        -webkit-appearance: none;
        background-color: var(--surface4);
        border-radius: 100%;
        width: calc(var(--font-size) / 1.5);
        height: calc(var(--font-size) / 1.5);
        border: none;
    }
`;

export const blockQuoteCss = css`
    :where(blockquote) {
        border-left: calc(var(--font-size) / 2) solid var(--surface4);
        margin: 0;
        padding-left: calc(var(--font-size) / 4 * 3);
    }
`;

export const selectCss = css`
    :where(select) {
        border: 1px solid var(--text2);
        background-color: var(--surface2);
        color: var(--text2);

        padding: 1vmin 0;
        padding-right: 6vmin;

        border-radius: 1vmin;

        max-width: max-content;

        font-size: calc(var(--font-size) / 1.2);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    :where(option) {
        background-color: var(--surface2);
    }
`;