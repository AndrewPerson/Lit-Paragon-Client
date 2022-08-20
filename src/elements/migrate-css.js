import { css } from "lit";

export const migrateCss = css`
    :host {
        position: absolute;
        top: 0;
        right: 0;

        z-index: 100;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        width: calc(100% - 12vmin);

        padding: 1rem;
        box-sizing: border-box;

        background-color: var(--surface4);

        border-radius: 0 0 0.5rem 0.5rem;

        box-shadow: var(--surface-shadow-strong) 0 0 1vmin;

        animation: appear 1s;
    }

    @media (max-aspect-ratio: 1/1) {
        :host {
            width: 100%;
        }
    }

    :host(.close) {
        animation: close 1s;
    }

    p {
        margin: 0;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;

        width: 1rem;
        height: 1rem;
    }

    img {
        width: inherit;
        height: inherit;
    }

    @keyframes appear {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(0%);
        }
    }

    @keyframes close {
        from {
            transform: translateY(0%);
        }

        to {
            transform: translateY(-100%);
        }
    }
`;