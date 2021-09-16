import { css } from "lit";

export const barcodeCss = css`
    :host {
        position: relative;

        flex: 1;

        display: flex;
        justify-content: center;

        margin: 2vh 2%;
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
    }

    #description {
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
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
    }

    #edit {
        position: absolute;
        top: 0;
        right: 0;
        width: 8vmin;
        height: 8vmin;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0);
        border: none;
    }
`;