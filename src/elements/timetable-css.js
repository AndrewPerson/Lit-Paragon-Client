import { css } from "lit"

export const roomPopupCss = css`
    :host {
        position: absolute;
        background-image: url(images/popup.svg);
        background-size: 100%;

        animation: appear 0.5s;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    :host(.reversed) {
        transform: rotate(180deg);
    }

    @media (max-aspect-ratio: 3/4) {
        :host(.reversed) {
            transform: translateY(1vmax) rotate(180deg);
        }
    }

    :host(.reversed) p {
        transform: rotate(180deg);
    }

    p {
        color: var(--text4);
        margin: 0;
        width: 10vmin;
        height: 3.9vmin;
        margin-top: 2vmin;
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    @keyframes appear {
        from {
            filter: opacity(0);
            z-index: 100;
        }

        to {
            filter: opacity(1);
            z-index: 100;
        }
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 1.7vmax;
        }
    }
`;

export const timetablePeriodCss = css`
    .highlighted {
        background-color: var(--surface4);
        color: var(--text4);
        border-radius: 1vmin;

        animation: appear 0.3s ease-out;
    }

    @keyframes appear {
        from {
            filter: opacity(0);
        }

        to {
            filter: opacity(1);
        }
    }

    div {
        display: flex;
        justify-content: center;
    }

    p {
        width: 10vmin;
        height: 3.9vmin;
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 0.5vmax;
        }
    }
`;

export const timetableDayCss = css`
    :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 12vmin;
        min-width: 0;
    }

    @media (max-aspect-ratio: 3/4) {
        :host {
            width: 9vmax;
        }
    }

    .name {
        margin-bottom: 1vmin;
        text-align: center;
        font-size: calc(var(--font-size) / 1.2);
        width: calc(var(--font-size) * 3.63);
        color: var(--text3);
        border-bottom: solid grey 1px;
    }

    .highlighted {
        color: var(--text2);
    }
`;

export const timetableRowCss = css`
    :host {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        padding-top: 1vmin;
        margin-bottom: 1vmin;
    }

    .period-nums {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .period-nums > p {
        color: var(--text3);
        height: 3.9vmin;
        line-height: calc(var(--font-size) * 1.5);

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        .period-nums > p {
            height: 3vmax;
            margin-top: 0.5vmax;
        }
    }
`;

export const fullTimetableCss = css`
    :host {
        margin: auto;
        padding: 4vmin;
        max-width: 92%;
    }

    timetable-row + timetable-row {
        border-top: solid grey 1px;
    }
`;