import { css } from "lit";

export const bellCss = css`
    :host {
        display: flex;
        align-items: center;
        width: 60%;
        margin-top: 0.5vmin;
        margin-bottom: 0.5vmin;
    }

    :host > * {
        display: inline-block;
    }

    .start {
        flex-grow: 4;
    }

    .end {
        flex-grow: 1;
        text-align: end;
    }

    .changed {
        color: lightskyblue;
    }

    p {
        margin: 0;
        color: rgb(185, 185, 185);
    }
`;

export const payloadBellCss = css`
    :host {
        margin-top: 1.5vmin;
        margin-bottom: 1.5vmin;
    }

    .time {
        font-size: 1.5vmin
    }

    @media (max-aspect-ratio: 5/8) {
        .time {
            font-size: 1vmax;
        }
    }

    p {
        color: rgb(100, 100, 100);
    }
`;

export const dailytimetableCss = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70vh;

        background-color: white;
        border-radius: 2vmin;
        box-shadow: 0 0 1vmin lightgrey
    }
    
    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    p {
        margin: 0;
    }

    #timer {
        margin: 0;
        font-size: 6vmin;
        display: inline-block;
        color: rgb(50, 50, 50);
    }

    @media (max-aspect-ratio: 5/8) {
        #timer {
            font-size: 5vmax;
        }
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
        border-bottom: 1px solid gray;
    }

    .line-right {
        margin-right: 10px;
    }

    .line-left {
        margin-left: 10px;
    }
`;