import { html, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { pagesMarketplaceCss, pageCardCss } from "./pages.css";
import { textCss, buttonCss, searchCss, fullContainerCss, containerCss } from "./default.css";

export class PageCard extends LitElement {
    static get styles() {
        return [textCss, buttonCss, pageCardCss]
    }
    
    static get properties() {
        return {
            title: {type: String},
            image: {type: String},
            description: {type: String},
            url: {type: String}
        };
    }

    async Install() {
        var cache = await caches.open(window.METADATA_CACHE);
        var metadataResponse = await cache.match("Metadata");
        if (!metadataResponse) return;

        var metadata = await metadataResponse.json();

        var extensions = window.getInstalledExtensions();

        extensions[this.title] = metadata.pages[this.title];

        localStorage.setItem("Installed Pages", JSON.stringify(extensions));

        var navOrder = JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");

        navOrder.push(navOrder.length);

        localStorage.setItem("Nav Order", JSON.stringify(navOrder));

        location.reload();
    }

    Uninstall() {
        var extensions = window.getInstalledExtensions();
        var keys = Object.keys(extensions);
        var index = keys.indexOf(this.title) + Navbar.defaultPages.length;

        delete extensions[this.title];

        var navOrder = JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");

        navOrder.splice(navOrder.indexOf(index), 1);

        for (var item of navOrder) {
            if (item > index)
                item -= 1;
        }

        localStorage.setItem("Installed Pages", JSON.stringify(extensions));
        localStorage.setItem("Nav Order", JSON.stringify(navOrder));

        var element = document.getElementById(`(page)${this.title}`);
        if (element) element.remove();

        location.reload();
    }

    constructor() {
        super();

        this.title = "";
        this.image = "";
        this.description = "";
        this.url = "";
    }

    render() {
        var imgUrl = new URL(this.url);
        imgUrl.pathname = this.image;

        var installed = Object.keys(window.getInstalledExtensions()).includes(this.title);

        return html`
            <div id="header">
                <div id="icon">
                    <img draggable="false" src="${imgUrl.toString()}"/>
                </div>
                <p id="title">${this.title}</p>
            </div>
            <p id="description">${this.description}</p>
            <button id="install" @click="${installed ? this.Uninstall : this.Install}">${installed ? "Uninstall" : "Install"}</button>
        `;
    }
}

export class PagesMarketplace extends LitElement {
    static get styles() {
        return [searchCss, fullContainerCss, containerCss, pagesMarketplaceCss];
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    Search() {

    }

    constructor() {
        super();

        this.data = {};
    }

    render() {
        return html`
            <div id="header">
                <input type="search" id="search" placeholder="Search..." autocomplete="off" @change="${this.Search}"/>
            </div>
            <div id="pages">
                ${repeat(Object.keys(this.data), key => key, title => html`
                    <page-card title="${title}"
                               image="${this.data[title].icon}"
                               description="${this.data[title].description}"
                               url="${this.data[title].url}">
                    </page-card>
                `)}
            </div>
        `;
    }
}

customElements.define("page-card", PageCard);
customElements.define("pages-marketplace", PagesMarketplace);