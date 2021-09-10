import { css } from "lit";

export const barcodeCss = css`
    :host {
        margin: auto;
        flex: 0.96;
        position: relative;
        display: flex;
        justify-content: center;
        width: 96% !important;
        height: 96vh !important;
        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    canvas {
        background-color: white;
        filter: contrast(5);
        transform: translate(10px, 10px);
    }

    #point1, #point2 {
        filter: none;
        width: 20px;
    }

    canvas, #point1, #point2 {
        position: absolute;
    }

    #info {
        position: absolute;
        top: 1vmin;
        color: var(--text1);
    }

    #description {
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
        filter: invert(var(--img-invert));
    }

    #descriptionContent {
        position: absolute;
        top: 5vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
        color: var(--text1);
    }

    #edit {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 0;
        width: 8vmin;
        height: 8vmin;
        display: flex;
        align-items: center;
        justify-content: center; 
        box-shadow: none;
        filter: invert(var(--img-invert));
    }

    .edit:hover {
        background-color: rgba(0, 0, 0, 0);
    }

    .edit:active {
        background-color: rgba(0, 0, 0, 0);
    }

    button {
        border: none;
    }
`;