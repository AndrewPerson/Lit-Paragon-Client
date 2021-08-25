import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
    }

    a {
        display: flex;
        width: 12vmin;
        height: 12vmin;
        cursor: default;
    }

    :host > :hover {
        background-color: var(--surface2);
        box-shadow: var(--surface-shadow) 0 0 2vmin;
        border-radius: 2vmin;
    }

    .nav-selected {
        background-color: var(--surface4);
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
        border-radius: 2vmin;
    }

    img {
        width: 5vmin;
        margin: 3.5vmin;
        filter: invert(var(--img-invert));

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`;

export const navMenuCss = css`
    :host :last-child {
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: var(--surface3);
    }

    :host {
        flex-shrink: 0;
        justify-content: center;
        background-color: var(--surface3);
        position: sticky;
        box-shadow: var(--surface-shadow-strong) 0 0 2vmin;
        overflow: hidden;
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
        background-color: var(--surface2);
        padding: 2vh 2vw;
        border-radius: 2vmin;
        z-index: 100;
        box-shadow: var(--surface-shadow) 0 0 2vmin;
    }

    p {
        text-align: center;
        color: var(--text1);
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .dismiss {
        margin-left: 1vmin;
    }

    button {
        border: none;
        background-color: var(--surface4);
        color: var(--text4);
        padding: 1vmin 2vmin;
        border-radius: 1vmin;
        max-width: max-content;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    button:hover {
        background-color: var(--surface3);
        color: var(--text1);
    }

    button:active {
        color: var(--text3);
    }
`;