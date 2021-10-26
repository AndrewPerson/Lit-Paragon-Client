import { css } from "lit";

export const settingsCss = css`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        position: relative;

        padding-top: 4vmin;
        padding-bottom: 4vmin;

        margin: auto;

        width: 60vw;
        max-width: 60vh;
        min-width: 300px;
        min-height: 70%;
    }

    @media (max-width: 300px) {
        :host {
            width: 100vw;
            min-width: unset;
        }
    }

    span {
        border-bottom: 0.2vmin solid gray;
        width: 60%;
    }

    #toggle {
        width: calc(calc(var(--font-size) * 2) + 2vmin);
        height: calc(calc(var(--font-size) * 2) + 2vmin);

        padding: 1vmin;
    }

    #toggle > img {
        width: 100%;
        height: 100%;
    }

    #description {
        z-index: 1;

        position: absolute;
        top: 1vmin;
        left: 1vmin;

        width: 4vmin;
        height: 4vmin;

        padding: 0;

        border: none;

        box-shadow: none;
    }

    #description:hover {
        background-color: transparent;
    }

    #description:active {
        background-color: transparent;
    }
    
    #description > img {
        width: inherit;
        height: inherit;
    }

    #descriptionContent {
        z-index: 1;
        position: absolute;
        top: 7vmin;
        left: 1vmin;
        width: 40vmin;
        background-color: var(--surface2);
        padding: 2vmin;
        border-radius: 2vmin;
        box-shadow: var(--shadow);
    }

    #hue::-moz-range-thumb {
        box-shadow: var(--shadow-colour)
                    /*
                        This bit basically changes the direction of
                        the shadow based on the position of the slider.
                        Since hue is relative to the position of the
                        slider, we use that as the position. We then
                        scale it to be between -1 and 1 and use that
                        to determine the direction of the shadow.
                    */
                    calc(calc(calc(var(--main-hue) - 180) / -180) * var(--shadow-x))
                    calc(var(--shadow-y) / 2)
                    calc(var(--shadow-spread) / 2);
    }

    #hue::-webkit-slider-thumb {
        box-shadow: var(--shadow-colour)
                    /*
                        This bit basically changes the direction of
                        the shadow based on the position of the slider.
                        Since hue is relative to the position of the
                        slider, we use that as the position. We then
                        scale it to be between -1 and 1 and use that
                        to determine the direction of the shadow.
                    */
                    calc(calc(calc(var(--main-hue) - 180) / -180) * var(--shadow-x))
                    calc(var(--shadow-y) / 2)
                    calc(var(--shadow-spread) / 2);
    }
`;