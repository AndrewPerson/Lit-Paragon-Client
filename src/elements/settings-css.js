import { css } from "lit";

export const settingsCss = css`
    :host {
        position: relative;

        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 2vh 2%;
    }

    * {
        z-index: 1;
    }

    #background {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        filter: blur(1vmin) opacity(0.3);
        z-index: 0;
    }

    #backgroundimg {
        position: absolute;
        filter: hue-rotate(var(--hue-rotate));
        height: 70vmin;
        transform: translate(5vmin, 0);
    }

    loading-element {
        width: 96vmin;
    }

    button {
        margin-bottom: 2vmin;
    }

    button > p {
        margin: 0;
    }

    input[type=range] {
        margin-top: 2vmin;
    }

    .mode {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 1vmin;
    }

    #modeImg {
        width: calc(var(--font-size) * 2);
    }

    #description {
        z-index: 1;
        position: absolute;
        top: 1vmin;
        left: 1vmin;
        width: 4vmin;
    }

    #descriptionContent {
        z-index: 1;
        position: absolute;
        top: 7vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
    }
`;