import { html, nothing, TemplateResult, LitElement } from "lit";
import { state } from "lit/decorators.js";

import { Callback } from "../../site/callback";
import { Resources } from "../../site/resources";

export enum PageState {
    Waiting,
    Loading,
    Loaded
}

export class Page extends LitElement {
    @state()
    private _state: PageState = PageState.Waiting;

    private _unreceivedResources: number = 0;
    private _uncompletedResources: number = 0;

    AddResource<T>(resourceName: string, callback: Callback<T>) {
        this._unreceivedResources++;
        this._uncompletedResources++;

        let received = false;
        let completed = false;

        Resources.ListenForResource<T>(resourceName, resource => {
            if (!received) {
                this._unreceivedResources--;
                received = true;
            }

            if (resource !== undefined) {
                if (!completed) {
                    this._uncompletedResources--;
                    completed = true;
                }

                callback(resource);
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
            <loading-indicator style="width: 80%; height: 100%; margin: auto;"></loading-indicator>
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