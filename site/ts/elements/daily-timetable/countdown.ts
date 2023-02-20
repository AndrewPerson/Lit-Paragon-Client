import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

//@ts-ignore
import countdownCss from "./countdown.css";
//@ts-ignore
import textCss from "default/text.css";

@customElement("daily-timetable-countdown")
export class DailyTimetableCountdown extends LitElement {
    static styles = [textCss, countdownCss];

    @property()
    periodTitle: string;

    @property({
        type: Date, 
        converter: {
            fromAttribute(value) {
                if (typeof value === "string") return new Date(value);
                return null;
            },
            toAttribute(value) {
                if (value instanceof Date) return value.toISOString();
                return null;
            }
        }
    })
    periodTime: Date;

    setIntervalID: number | null = null;

    disconnectedCallback() {
        super.disconnectedCallback();

        if (this.setIntervalID != null) window.clearInterval(this.setIntervalID);
    }

    render() {
        if (this.setIntervalID == null) this.setIntervalID = window.setInterval(() => this.requestUpdate(), 1000);;

        const timeDisplay = HumanTimeDisplay(new Date(), this.periodTime);

        if (this.periodTime <= new Date()) {
            const event = new CustomEvent("countdown-finished", {
                bubbles: true,
                cancelable: true,
                composed: true
            });

            this.dispatchEvent(event);

            if (this.setIntervalID != null) window.clearInterval(this.setIntervalID);
            this.setIntervalID = null;
        }

        return html`
            <p>${this.periodTitle}</p>
            <p>${timeDisplay.preposition}</p>
            <h1 class="time">${timeDisplay.time}</h1>
        `;
    }
}

//Returns the difference between now and future in a human-understandable format.
function HumanTimeDisplay(now: Date, future: Date) {
    const timeDifference = future.getTime() - now.getTime();

    if (now.getMonth() > future.getMonth() && now.getDate() > future.getDate()) {
        const difference = (future.getMonth() < now.getMonth() ? future.getMonth() + 12 : future.getMonth()) - now.getMonth();

        return {
            preposition: "in",
            time: difference + (difference == 1 ? " Month" : " Months")
        };
    }
    //Length of one day in ms
    else if (timeDifference > 86400000) {
        const days = Math.round(timeDifference / 86400000);

        if (days == 1)
            return {
                preposition: "is",
                time: "Tomorrow"
            };

        return {
            preposition: "in",
            time: days + " Days"
        };
    }
    else {
        const hours = Math.floor(timeDifference / 3600000).toString().padStart(2, "0");
        const minutes = Math.floor((timeDifference % 3600000) / 60000).toString().padStart(2, "0");
        const seconds = Math.floor((timeDifference % 60000) / 1000).toString().padStart(2, "0");

        if (hours == "00")
            return {
                preposition: "in",
                time: `${minutes}:${seconds}`
            };

        return {
            preposition: "in",
            time: `${hours}:${minutes}:${seconds}`
        }
    }
}