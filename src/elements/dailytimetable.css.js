import { css } from "lit";

export const bellCss = css`
    :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        margin-top: 0.5vmin;
        margin-bottom: 0.5vmin;
    }

    :host > * {
        display: inline-block;
    }

    .changed {
        color: var(--text2);
    }

    p {
        margin: 0;
        color: var(--text3);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    style {
        display: none !important;
    }
`;

export const payloadBellCss = css`
    :host {
        margin-top: 1.5vmin;
        margin-bottom: 1.5vmin;
    }

    .sub {
        font-size: calc(var(--font-size) / 1.8);
    }

    p {
        color: var(--text1);
    }
`;

export const dailytimetableCss = css`
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
        min-height: 70%;
    }

    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    #timer {
        font-size: calc(var(--font-size) * 2.5);
        display: inline-block;
    }

    #fullscreen {
        position: absolute;
        top: 2vmin;
        right: 2vmin;

        width: 4vmin;
        height: 4vmin;

        background-color: transparent;
        border: none;
        padding: 0;
    }

    #fullscreen > img {
        width: inherit;
        height: inherit;
    }

    .timer-container {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .line-right, .line-left {
        display: inline-block;
        flex: 1;
        border-bottom: 0.2vmin solid gray;
    }

    .line-right {
        margin-right: 2vmin;
    }

    .line-left {
        margin-left: 2vmin;
    }
`;

export const fullscreenDailytimetableCss = css`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3vmin;

        width: 100%;
        height: 100%;

        position: absolute;
        top: 0px;
        left: 0px;

        z-index: 101;

        background-color: var(--surface1);
    }

    #logo {
        width: auto;
        height: 70vmax;
        filter: blur(1vmin) opacity(0.2) hue-rotate(var(--hue-rotate));
        position: absolute;
        transform: translateX(5vmin);
        z-index: -1;
    }

    #rings {
        width: 90vmax;
        height: 90vmax;
        filter: blur(1vmin) opacity(0.2);
        position: absolute;
        z-index: -1;
    }

    #close {
        position: absolute;
        top: 2vmin;
        right: 2vmin;

        width: 4vmin;
        height: 4vmin;

        background: transparent;
        border: none;
        padding: 0;
    }

    #close > img {
        width: inherit;
        height: inherit;
    }

    #time {
        font-size: calc(var(--font-size) * 2);
    }

    #bell {
        font-size: calc(var(--font-size) * 6);
    }

    #details,
    #details span {
        font-size: calc(var(--font-size) * 1.5);
    }

    .changed {
        color: var(--text2);
    }
`;