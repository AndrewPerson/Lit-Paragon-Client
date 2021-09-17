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
    }

    .title {
        cursor: pointer;
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
        top: 0;
        right: 0;

        width: 4vmin;

        cursor: pointer;
    }
`;

export const announcementContainerCss = css`
    :host {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        
        flex: 1;
        
        margin: 2vh 2%;

        padding: 2vmin;

        min-width: calc(300px - 4vmin);
        min-height: 0;
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
`;