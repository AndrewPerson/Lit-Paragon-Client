import { css } from "lit";

export const barcodeCss = css`
    :host {
        position: relative;

        display: flex;
        justify-content: center;
    }

    canvas {
        background-color: white;
        filter: contrast(5);
    }

    #point1, #point2 {
        width: var(--font-size);
        height: var(--font-size);
        background-color: var(--surface4);
        border-radius: 100%;
        transform: translate(calc(var(--font-size) / -2), calc(var(--font-size) / -2));
    }

    canvas, #point1, #point2 {
        position: absolute;
    }

    #info {
        position: absolute;
        top: 1vmin;
    }

    #description {
        position: absolute;
        top: 1vmin;
        left: 1vmin;

        width: 4vmin;
        height: 4vmin;

        background: transparent;
        border: none;
        padding: 0;
    }

    #descriptionImg {
        width: 4vmin;
        height: 4vmin;
    }

    #descriptionContent {
        position: absolute;
        top: 7vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--shadow);
    }

    #edit {
        position: absolute;
        top: 1vmin;
        right: 1vmin;
        width: 4vmin;
        height: 4vmin;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
    }
`;