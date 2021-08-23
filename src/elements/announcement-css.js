import { css } from "lit";

export const announcementItemCss = css`
    :host {
        position: relative;
        margin-top: 2vmin;
        margin-bottom: 2vmin;
    }

    p {
        margin: 0;
        margin-top: 1vmin;
        color: var(--text1);
    }

    .title {
        cursor: pointer;
    }

    .sub {
        font-size: 1.7vmin
    }

    @media (max-aspect-ratio: 5/8) {
        .sub {
            font-size: 1.1vmax;
        }
    }

    .collapsed {
        display: none;
    }

    .collapsed + .toggle {
        transform: rotate(180deg);
    }

    .expanded {
        display: block;
        margin-top: 4vmin;
    }

    .toggle {
        margin-top: 2vmin;
        position: absolute;
        top: 0;
        right: 0;
        width: 4vmin;
        cursor: pointer;
        filter: invert(var(--img-invert));
    }
`;

export const announcementContainerCss = css`
    :host {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 96%;
        height: 96vh;
        padding: 2vmin;
        background-color: var(--surface2);
        border-radius: 2vmin;
        box-shadow: var(--surface-shadow) 0 0 1vmin;
    }

    .header {
        min-width: 100%;
        margin-top: 1vmin;
        margin-bottom: 1vmin;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .announcements {
        margin-top: 2vmin;
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: scroll;
        padding-right: 1vmin;
    }

    .announcements::-webkit-scrollbar {
        width: 1vmin;
    }

    .announcements::-webkit-scrollbar-thumb {
        background-color: var(--surface4);
        border-radius: 1vmin;
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

    button {
        border: solid rgb(82, 143, 255) 1px;
        background-color: var(--surface2);
        color: var(--text1);
        padding: 1vmin 2vmin;
        border-radius: 1vmin;
        max-width: max-content;
    }

    button:hover {
        background-color: var(--surface3);
    }

    button:active {
        border: none;
        background-color: var(--surface4);
        color: var(--text1);
    }

    select {
        border: solid rgb(82, 143, 255) 1px;
        background-color: var(--surface2);
        color: var(--text2);
        padding: 1vmin 0;
        padding-right: 6vmin;
        border-radius: 1vmin;
        max-width: max-content;
    }

    option {
        background-color: var(--surface2);
    }
`;