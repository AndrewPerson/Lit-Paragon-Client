import { css } from "lit";

export const announcementItemCss = css`
    :host {
        position: relative;
        margin-top: 2vmin;
        margin-bottom: 2vmin;
    }

    h1, h2, h3, h4, h5, h6, p {
        user-select: auto;
        -ms-user-select: auto;
        -moz-user-select: auto;
        -webkit-user-select: auto;
    }

    p {
        margin: 0;
        margin-top: 1vmin;
    }

    button {
        border: none;
        background: transparent;
        padding: 0;
    }

    #title {
        cursor: pointer;
        user-select: text;
    }

    #sub {
        font-size: calc(var(--font-size) / 1.5);
        user-select: text;
        cursor: auto;
    }

    #toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;

        cursor: pointer;
    }

    #toggleImg {
        margin-top: 2vmin;

        width: 4vmin;
    }

    #toggleImg.flipped {
        transform: rotate(180deg);
    }

    .collapsed {
        display: none;
    }

    .expanded {
        display: block;
        margin-top: 4vmin;
    }

    #content {
        user-select: text;
        cursor: auto;
    }
`;

export const announcementContainerCss = css`
    :host {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        padding: 2vmin;

        min-width: 0;
        min-height: 0;
    }

    #header {
        min-width: 100%;

        margin-top: 1vmin;
        margin-bottom: 1vmin;

        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    #announcements {
        margin-top: 2vmin;

        display: flex;
        flex-direction: column;

        flex: 1;

        overflow-y: auto;

        padding-right: 1vmin;

        scrollbar-width: thin;
        scrollbar-color: var(--surface4) transparent;
    }

    #announcements::-webkit-scrollbar {
        width: 1vmin;
    }

    #announcements::-webkit-scrollbar-thumb {
        background-color: var(--surface4);
        border-radius: 1vmin;
    }

    #nothing {
        margin: auto;
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