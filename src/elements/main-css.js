import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
        width: fit-content;
        height: fit-content;
        position: relative;
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

    :host-context([editing])::after {
        position: absolute;
        top: calc(50% - 1vmin);
        left: 10%;

        background-image: url(./images/drag.svg);
        background-size: contain;
        background-repeat: no-repeat;

        content: "";

        height: 2vmin;
        width: 2vmin;
    }

    @media (max-aspect-ratio: 1/1) {
        :host-context([editing])::after {
            transform: rotate(90deg);
            top: 10%;
            left: calc(50% - 1vmin);
        }
    }

    button {
        display: flex;

        width: 12vmin;
        height: 12vmin;

        padding: 0;

        background-color: transparent;
        border: none;
    }

    ::slotted(img) {
        margin: 3.3vmin;
        width: 5.4vmin;
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
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
        height: 88vmin;

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

            width: 88%;
            height: 12vmin;

            margin-left: 12%;

            bottom: 0;
            left: 0;

            overflow-x: auto;
            overflow-y: hidden;
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
        position: fixed;
        left: 0;
        bottom: 0;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        height: fit-content;

        box-shadow: var(--shadow);

        background-color: var(--surface3);

        z-index: -1;
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