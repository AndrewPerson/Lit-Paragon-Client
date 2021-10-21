import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
        width: 12vmin;
        height: 12vmin;
        position: relative;
        border-radius: 2vmin;
    }

    :host(:hover:not(:host([editing]))) {
        background-color: var(--surface2);
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
    }

    #handle {
        --size: 2vmin;
        --padding: 2vmin;

        --full-size: calc(calc(var(--padding) * 2) + var(--size));

        position: absolute;
        top: calc(50% - calc(var(--full-size) / 2));
        left: calc(calc(calc(3.3vmin - var(--size)) / 2) - var(--padding));

        display: block;
        
        height: var(--full-size);

        padding: var(--padding);

        box-sizing: border-box;

        cursor: move;
    }

    :host(.selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--shadow-colour) calc(var(--shadow-x) / 2) calc(var(--shadow-y) / 2) var(--shadow-spread);
    }

    :host(.drag) {
        background-color: var(--surface4) !important;
        border-radius: 2vmin !important;
        box-shadow: none !important;
    }

    a {
        display: flex;

        width: 12vmin;
        height: 12vmin;
    }

    ::slotted(img) {
        padding: 3.3vmin;
        width: 5.4vmin;
        filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    }
`;

export const navMenuCss = css`
    :host {
        flex-shrink: 0;

        background-color: var(--surface3);
        box-shadow: var(--small-shadow);

        overflow: hidden;

        box-sizing: border-box;

        z-index: 100;
    }

    #items-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: nowrap;
        
        width: 100%;
        height: 100%;
    
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }

    @media not all and (max-aspect-ratio: 1/1) {
        :host {
            width: 12vmin;
            height: 100%;

            padding-bottom: 12vmin;

            border-radius: 0 2vmin 2vmin 0;
        }

        #items-container {
            flex-direction: column;
            justify-content: flex-start;

            overflow-x: hidden;
            overflow-y: auto;
        }

        nav-item:last-of-type {
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 0 0 2vmin 0;
        }
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            order: 100;

            width: 100%;
            height: 12vmin;

            border-radius: 2vmin 2vmin 0 0;
        }

        #items-container {
            flex-direction: row;
            justify-content: space-around;

            overflow-x: auto;
            overflow-y: hidden;
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
        left: 0;
        --angle: 90deg;
    }

    #right-shadow {
        border-radius: 0 2vmin 0 0;
        right: 0;
        --angle: -90deg;
    }
`;

export const extensionPageCss = css`
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #frame {
        border: none;
        width: 100%;
        height: 100%;
    }

    #loader {
        width: 80vmin;
        height: 80vmin;
    }
`;