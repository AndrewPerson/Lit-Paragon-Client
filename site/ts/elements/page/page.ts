import { LitElement, html, nothing, TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { Site } from "../../site";

export enum PageState {
    Waiting,
    Loading,
    Loaded
}

export class Page extends LitElement {
    [index: string]: any;

    @state()
    private _state: PageState = PageState.Waiting;

    private _unreceivedResources: number = 0;
    private _uncompletedResources: number = 0;

    AddResource(resourceName: string, property: string) {
        this._unreceivedResources++;
        this._uncompletedResources++;

        var received = false;
        var completed = false;

        Site.GetResource(resourceName, (resource: any) => {
            if (!received) {
                this._unreceivedResources--;
                received = true;
            }

            if (resource !== null && resource !== undefined) {
                if (!completed) {
                    this._uncompletedResources--;
                    completed = true;
                }

                this[property] = resource;
            }

            if (this._uncompletedResources == 0)
                this._state = PageState.Loaded;
            else if (this._unreceivedResources == 0)
                this._state = PageState.Loading;
        });
    }

    render() {
        if (this._state == PageState.Waiting) return nothing;
        if (this._state == PageState.Loading) {
            return html`
            <loading-indicator style="width: 80%; height: 80%; margin: 10%;"></loading-indicator>
            <style>
                :host {
                    display: flex;
                }
            </style>
            `;
        }

        return this.renderPage();
    }

    renderPage(): TemplateResult<1> | typeof nothing {
        return nothing;
    }
}