import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
    }

    :host(:hover) {
        background-color: var(--surface2);
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
        border-radius: 2vmin;
    }

    :host(.nav-selected) {
        background-color: var(--surface4) !important;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
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
    nav-item:last-of-type {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    :host {
        flex-shrink: 0;
        justify-content: center;
        background-color: var(--surface3);
        position: sticky;
        overflow: hidden;
        z-index: 100;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
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