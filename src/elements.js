import {html, LitElement, css} from "lit";

export class Navbar extends LitElement {
    static get styles() {
        var deviceSpecificStyle;

        if (innerWidth >= innerHeight) {
            deviceSpecificStyle = css`
            :host {
                flex-shrink: 0;
                width: 12vmin;
                height: 100vh;
                top: 0;
                left: 0;
            }
            `;
        }
        else {
            deviceSpecificStyle = css`
            :host {
                order: 100;
                width: 100vw;
                height: 12vw;
                bottom: 0;
                left: 0;
                text-align: center;
            }
            `;
        }

        return [
            css`
            :host :last-child {
                position: absolute;
                left: 0;
                bottom: 0;
                background-color: aliceblue;
            }

            :host {
                background-color: aliceblue;
                position: sticky;
                box-shadow: 0 0 1vmin gray;
                overflow: hidden;
            }
            `,
            deviceSpecificStyle
        ];
    }

    render() {
        return html`
            <nav-item link="/dailytimetable" title="Daily Timetable" icon="dailytimetable"></nav-item>
            <nav-item link="/barcode" title="ID Barcode" icon="barcode"></nav-item>
            <nav-item link="/announcements" title="Announcements"></nav-item>
            <nav-item link="/timetable" title="Timetable"></nav-item>
            <nav-item link="/calendar" title="Calendar"></nav-item>

            <nav-item link="/settings" title="Settings"></nav-item>
        `;
    }
}

customElements.define("nav-bar", Navbar);

export const Arrangment = {
    Horizontal: "Horizontal",
    Vertical: "Vertical"
};

export class NavItem extends LitElement {
    static get styles() {
        var deviceSpecificStyle = css``;

        if (innerWidth >= innerHeight) {
            deviceSpecificStyle = css`
            :host {
                display: block;
            }
            `;
        }
        else {
            deviceSpecificStyle = css`
            :host {
                display: inline-block;
            }
            `;
        }

        return [
            css`
            a {
                display: block;
                width: 12vmin;
                height: 12vmin;
            }

            a :hover {
                background-color: lightcyan;
                box-shadow: 0 0 2vmin gray;
                border-radius: 2vmin;
            }

            .nav-selected {
                background-color: lightskyblue;
                box-shadow: 0 0 2vmin gray;
                border-radius: 2vmin;
            }

            img {
                width: 5vmin;
                padding: 3.5vmin;
            }
            `,
            deviceSpecificStyle
        ];
    }

    static get properties() {
        return {
            link: {type: String},
            title: {type: String},
            icon: {type: String}
        };
    }

    constructor() {
        super();

        this.link = "";
        this.title = "Home";
    }

    render() {
        if (!this.icon) this.icon = this.title.toLowerCase();

        //Trims / off front and end of the path and the link.
        this.linkClass = location.pathname == this.link ? "nav-selected" : "";

        return html`
            <a href="${this.link}" title="${this.title}" class="${this.linkClass}">
                <img src="images/${this.icon}.svg" />
            </a>
        `;
    }
}

customElements.define("nav-item", NavItem);