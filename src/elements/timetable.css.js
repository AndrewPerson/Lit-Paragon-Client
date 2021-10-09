import { css } from "lit";

export const timetablePeriodCss = css`
    :host {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .highlighted {
        background-color: var(--surface4);
        color: var(--text4);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);
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

    p {
        width: 10vmin;
        height: 3.9vmin;
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    #popup {
        position: absolute;
        top: 4.9vmin;

        color: var(--text4);

        border-radius: 1vmin;
        background-color: var(--surface4);

        z-index: 99;

        animation: popupAppear 0.3s ease-out;
    }

    #popup::before {
        --size: 1vmin;

        content: "";

        position: absolute;
        left: calc(50% - var(--size));
        top: calc(-1 * var(--size));

        border-right: var(--size) solid transparent;
        border-bottom: var(--size) solid var(--surface4);
        border-left: var(--size) solid transparent;
    }

    #popup[reversed] {
        top: -4.9vmin;
    }

    #popup[reversed]::before {
        top: unset;
        bottom: calc(-1 * var(--size));

        transform: rotate(180deg);
    }

    @keyframes popupAppear {
        from {
            filter: opacity(0);
            z-index: 99;
        }

        to {
            filter: opacity(1);
            z-index: 99;
        }
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            width: 8vmax;
            height: 3vmax;
            margin-top: 0.5vmax;
        }

        #popup {
            top: 4vmax;
        }

        #popup[reversed] {
            top: -4vmax;
        }

        #popup::before, #popup[reversed]::before {
            --size: 1vmax;
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
        border-bottom: solid grey 0.2vmin;
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
        border-top: solid grey 0.2vmin;
    }
`;