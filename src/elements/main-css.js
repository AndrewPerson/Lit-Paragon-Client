import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
        width: fit-content;
        height: fit-content;
    }

    :host(:hover) {
        background-color: var(--surface2) !important;
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
        border-radius: 2vmin;
    }

    :host(.nav-selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
        border-radius: 2vmin;
    }

    button {
        display: flex;

        width: 12vmin;
        height: 12vmin;

        padding: 0px;

        background-color: transparent;
        border: none;
    }

    img {
        margin: 3.3vmin;
        width: 5.4vmin;
    }
`;

export const navMenuCss = css`
    :host {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        
        flex-shrink: 0;
        
        background-color: var(--surface3);

        width: 12vmin;

        position: sticky;
        top: 0;
        left: 0;

        overflow-x: hidden;
        overflow-y: auto;

        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
    
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            flex-direction: row;

            text-align: center;

            order: 100;

            width: 100%;
            height: 12vw;

            bottom: 0;
            left: 0;

            overflow-x: auto;
            overflow-y: hidden;
        }

        .end {
            order: -1 !important;
        }
    }

    :host(:hover), :host(.hover) {
        scrollbar-color: var(--text3) transparent;
    }

    :host::-webkit-scrollbar {
        width: 1vmin;
        height: 1vmin;
        display: none;
    }

    :host(:hover)::-webkit-scrollbar,
    :host(.hover)::-webkit-scrollbar {
        display: unset;
    }

    :host::-webkit-scrollbar-thumb {
        background-color: var(--text3);
    }

    :host::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .end {
        order: 100000;

        position: sticky;
        left: 0px;
        bottom: 0px;

        justify-self: flex-end;
        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        height: fit-content;
    }

    .end > * {
        border-radius: 2vmin;
        background-color: var(--surface3);
        box-shadow: var(--shadow);
    }
`;

export const loadingElementCss = css`
    :host {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .spinner {
        width: inherit;
        animation: 3s infinite spin;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`;

export const loginNotificationCss = css`
    :host {
        position: absolute;
        top: 1vh;
        right: 1vw;
        min-width: min-content;
        width: 40vmin;
        padding: 2vh 2vw;
        z-index: 100;
    }

    p {
        text-align: center;
        margin: var(--font-size);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .dismiss {
        margin-left: 1vmin;
    }
`;