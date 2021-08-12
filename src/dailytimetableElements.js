import { html, LitElement } from "lit";

export class BellItem extends LitElement {
    static get styles() {
        return css``;
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    constructor() {
        super();

        this.data = {
            bell: "",
            time: "00:00",
            reasonShort: "",
            reason: "",
            bellDisplay: ""
        }
    }
}

customElements.define("bell-item", BellItem);

export class PayloadBellItem extends LitElement {
    static get styles() {
        return css`
        :host {
            display: flex;
            width: 90%;
        }

        .main {
            flex-grow: 4;
        }

        .room {
            flex-grow: 1;
        }
        `;
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    constructor() {
        super();

        this.data = {
            bell: "",
            time: "00:00",
            reasonShort: "",
            reason: "",
            bellDisplay: "",
            payload: {
                title: "",
                teacher: "",
                room: "",
                fullTeacher: "",
                year: ""
            }
        }
    }

    render() {
        return html`

        `;
    }
}

customElements.define("payload-bell-item", PayloadBellItem);

export class DailyTimetable extends LitElement {
    static get styles() {
        return css``;
    }

    static get properties() {
        return {
            data: {type: Object}
        }
    }

    constructor() {
        super();

        this.data = {
            bells: [],
            timetable: {
                timetable: {
                    periods: {}
                }
            },
            roomVariations: [],
            classVariations: []
        };
    }

    render() {
        var htmlResult = html``;

        this.data.bells.forEach(bell => {
            var period = this.data.timetable.timetable.periods[bell.bell];

            if (period) {
                htmlResult += html``;
            }
            else {
                htmlResult += html``;
            }
        });

        return htmlResult;
    }
}

customElements.define('daily-timetable', DailyTimetable);