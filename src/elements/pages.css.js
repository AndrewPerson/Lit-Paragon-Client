import { css } from "lit";

export const pageCardCss = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1;
        min-width: calc(var(--font-size) * 11.5);
        padding: 1.5vmin;
    }
    #header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 1.5vmin;
        width: 100%;
    }
    #icon {
        width: 10vmin;
        min-width: 10vmin;
        height: 10vmin;
        min-height: 10vmin;
        padding: 1vmin;
        box-sizing: border-box;
        border-radius: 100%;
        box-shadow: var(--small-shadow);
    }
    #icon > img {
        width: 100%;
        height: 100%;
    }
    #description {
        padding: 1.5vmin;
        padding-right: 0;
        word-break: break-word;
    }
`;

export const pagesMarketplaceCss = css`
    :host {
        padding: 2vmin;
    }
    #header {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 3vmin;
    }
    #pages {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(calc(var(--font-size) * 15), 1fr));
        gap: 3vmin;
    }
`;