import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
        width: 12vmin;
        height: 12vmin;
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

    #handle {
        width: 1.5vmin;
        height: 12vmin;
        margin-left: 0.75vmin;
    }

    #handle:hover {
        cursor: grab;
    }

    button {
        display: flex;

        width: 12vmin;
        height: 12vmin;

        padding: 0;

        background-color: transparent;
        border: none;
    }

    :host([editing])::before {
        content: "";

        background-image: url(/images/drag.svg);
        background-repeat: no-repeat;
        background-size: contain;
        filter: hue-rotate(var(--hue-rotate)) invert(var(--img-invert));
        
        position: absolute;
        top: calc(50% - 1vmin);
        left: 1vmin;

        display: block;
        
        width: 2vmin;
        height: 2vmin;
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
        align-items: center;
        justify-content: space-between;

        flex-shrink: 0;

        background-color: var(--surface3);
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) calc(var(--shadow-spread) / 2);

        width: 12vmin;
        height: 100%;

        overflow: hidden;

        border-radius: 0 2vmin 2vmin 0;

        box-sizing: border-box;
        padding-bottom: 12vmin;
    }

    #items-container {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        
        width: 100%;
        height: 100%;

        overflow-x: hidden;
        overflow-y: auto;
    
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }

    .end {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .end > nav-item {
        border-radius: 0 0 2vmin 0;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            order: 100;

            width: 100%;
            height: 12vmin;

            border-radius: 2vmin 2vmin 0 0;

            padding-bottom: 0;
            padding-left: 12%;
        }

        #items-container {
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;

            overflow-x: auto;
            overflow-y: hidden;
        }

        .end > nav-item {
            border-radius: 2vmin 0 0 0;
        }
    }

    #items-container:hover, #items-container.hover {
        scrollbar-color: var(--text3) transparent;
    }

    #items-container::-webkit-scrollbar {
        width: 1vmin;
        height: 1vmin;
        display: none;
    }

    #items-container:hover::-webkit-scrollbar,
    #items-container.hover::-webkit-scrollbar {
        display: unset;
    }

    #items-container::-webkit-scrollbar-thumb {
        background-color: var(--text3);
    }

    #items-container::-webkit-scrollbar-track {
        background-color: transparent;
    }

    #top-shadow,
    #bottom-shadow,
    #left-shadow,
    #right-shadow {
        position: absolute;
        background-image: linear-gradient(var(--angle), var(--shadow-colour), transparent);
        z-index: 98;
    }

    #top-shadow,
    #bottom-shadow {
        width: 12vmin;
        height: 2vmin;
        left: 0;
    }

    #top-shadow {
        border-radius: 0 2vmin 0 0;
        top: 0;
        --angle: 180deg;
    }

    #bottom-shadow {
        bottom: 12vmin;
        --angle: 0;
    }

    #left-shadow,
    #right-shadow {
        width: 2vmin;
        height: 12vmin;
        bottom: 0;
    }

    #left-shadow {
        left: 12vmin;
        --angle: 90deg;
    }

    #right-shadow {
        border-radius: 0 2vmin 0 0;
        right: 0;
        --angle: -90deg;
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