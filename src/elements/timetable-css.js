import { css } from "lit"

export const roomPopupCss = css`
    :host {
        position: absolute;
        background-image: url(images/popup.svg);
        background-size: 100%;

        animation: appear 0.5s;
    }

    @keyframes appear {
        from {
            filter: opacity(0);
        }

        to {
            filter: opacity(1);
        }
    }

    p {
        color: var(--text4);
        margin: 0;
        width: 10vmin;
        height: 3.9vmin;
        margin-top: 2vmin;
        text-align: center;
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
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

        animation: appear 0.5s;
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
        color: var(--text1);
        margin: 0;
        width: 10vmin;
        margin-right: 1vmin;
        margin-left: 1vmin;
        height: 3.9vmin;
        text-align: center;
        cursor: default;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            margin-left: 0.5vmax;
            margin-right: 0.5vmax;
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
    }

    .name {
        margin: 0;
        text-align: center;
        font-size: 2.2vmin;
        width: 8.8vmin;
        color: var(--text3);
        border-bottom: solid grey 1px;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        .name {
            width: 5.8vmax;
            font-size: 1.6vmax;
        }
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
        margin: 0;
        height: 3.9vmin;

        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    @media (max-aspect-ratio: 3/4) {
        .period-nums > p {
            height: 3vmax;
        }
    }
`;

export const fullTimetableCss = css`
    :host {
        padding: 4vmin;
        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    timetable-row + timetable-row {
        border-top: solid grey 1px;
    }
`;