import { css } from "lit";

export const timetablePeriodCss = css`
    :host {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .highlighted {
        border-radius: 1vmin;

        background-color: var(--surface4);
        color: var(--text4);

        box-shadow: var(--shadow);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);

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
        width: calc(var(--font-size) * 4);
        height: calc(var(--font-size) * 1.5);
        text-align: center;
        line-height: calc(var(--font-size) * 1.5);
    }

    @media (max-aspect-ratio: 3/4) {
        p {
            margin-top: 0.5vmax;
        }
    }

    #popup {
        position: absolute;
        top: calc(var(--font-size) * 2);

        color: var(--text4);

        border-radius: 1vmin;
        background-color: var(--surface4);

        box-shadow: var(--shadow);
        text-shadow: 0.2vmin 0.2vmin var(--shadow-colour);

        z-index: 99;

        animation: popupAppear 0.3s ease-out;

        pointer-events: none;
    }

    #popup::before {
        --size: calc(var(--font-size) / 2);

        content: "";

        position: absolute;
        left: calc(50% - calc(var(--size) / 1.5));
        top: calc(-1 * var(--size));

        border-right: calc(var(--size) / 1.5) solid transparent;
        border-bottom: var(--size) solid var(--surface4);
        border-left: calc(var(--size) / 1.5) solid transparent;
    }

    #popup[reversed] {
        top: calc(var(--font-size) * -2);
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
`;

export const timetableDayCss = css`
    :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: calc(var(--font-size) * 4.5);
        min-width: 0;
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
        width: calc(var(--font-size) * 23);
        height: calc(calc(var(--font-size) * 25.5) + 9vmin);
    }

    @media (max-aspect-ratio: 3/4) {
        :host {
            height: calc(calc(calc(var(--font-size) * 25.5) + 9vmin) + 7.5vmax);
        }
    }

    timetable-row + timetable-row {
        border-top: solid grey 0.2vmin;
    }
`;