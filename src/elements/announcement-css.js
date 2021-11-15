import { css } from "lit";

export const announcementItemCss = css`
    :host {
        position: relative;
        margin-top: 2vmin;
        margin-bottom: 2vmin;
    }

    * {
        margin: 1vmin 0;
        color: var(--text1);
    }

    p {
        margin-top: 1vmin;
        color: var(--text1);
    }

    blockquote {
        border-left: calc(var(--font-size) / 2) solid var(--surface4);
        margin: 0;
        padding-left: calc(var(--font-size) / 4 * 3);
    }

    h1, h2, h3, h4, h5, h6 {
        border-bottom: 0.1vmin solid var(--text1);
        font-weight: normal;
        margin-top: 5vmin;
        padding-bottom: 1vmin;
    }

    .title {
        cursor: pointer;
        margin-top: 0;
        padding-right: 4vmin;
    }

    .sub {
        font-size: calc(var(--font-size) / 1.5);
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
        top: -1vmin;
        right: 0;
        width: 4vmin;
        cursor: pointer;
        filter: invert(var(--img-invert));
    }
`;

export const announcementContainerCss = css`
    :host {
        box-sizing: border-box;
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

    p {
        color: var(--text1);
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
        overflow-y: auto;
        padding-right: 1vmin;
        
        scrollbar-width: thin;
        scrollbar-color: var(--surface4) transparent;
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

    select {
        border: solid rgb(82, 143, 255) 1px;
        background-color: var(--surface2);
        color: var(--text2);
        padding: 1vmin 0;
        padding-right: 6vmin;
        border-radius: 1vmin;
        max-width: max-content;
        font-size: calc(var(--font-size) / 1.2);
    }

    option {
        background-color: var(--surface2);
    }
`;