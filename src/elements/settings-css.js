import { css } from "lit";

export const settingsCss = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        position: relative;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        margin: auto;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70vh;
    }
    
    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    span {
        border-bottom: 0.2vmin solid gray;
        width: 60%;
    }

    .toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding: 1vmin;
    }

    .toggleImg {
        width: calc(var(--font-size) * 1.8);
        padding: calc(var(--font-size) * 0.1);
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
        box-shadow: var(--shadow);
    }
`;