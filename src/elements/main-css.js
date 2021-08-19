import { css } from "lit";

export const navItemCss = css`
    :host {
        display: inline-block;
    }

    a {
        display: flex;
        width: 12vmin;
        height: 12vmin;
    }

    :host > :hover {
        background-color: lightcyan;
        box-shadow: 0 0 2vmin gray;
        border-radius: 2vmin;
    }

    .nav-selected {
        background-color: lightskyblue;
        box-shadow: 0 0 2vmin gray;
        border-radius: 2vmin;
    }

    img {
        width: 5vmin;
        margin: 3.5vmin;
    }
`;

export const navMenuCss = css`
    :host :last-child {
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: aliceblue;
    }

    :host {
        flex-shrink: 0;
        justify-content: center;
        background-color: aliceblue;
        position: sticky;
        box-shadow: 0 0 1vmin gray;
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