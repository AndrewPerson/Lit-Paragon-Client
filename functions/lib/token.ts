import { ErrorResponse } from "./error";
import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";

export type Token = {
    access_token: string,
    refresh_token: string,
    expiry: Date,
    termination: Date
}

export class TokenFactory {
    static async Refresh(token: Token, client_id: string, client_secret: string, endpoint: string, tracer: RequestTracer): Promise<Token> {
        tracer.addData({
            token: {
                refresh: {
                    attempted: true
                }
            }
        });

        let response = await tracer.fetch(`${endpoint}/api/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                refresh_token: token.refresh_token,
                grant_type: "refresh_token",
                client_id: client_id,
                client_secret: client_secret
            })
        });

        if (!response.ok) {
            tracer.addData({
                token: {
                    refresh: {
                        error: true
                    }
                }
            });

            if (response.status >= 500) {
                throw new ErrorResponse("An error occurred on the SBHS servers.", 502);
            }

            if (response.status == 401 || response.status == 400) {
                throw new ErrorResponse("Unauthorised.", 401);
            }

            if (response.status >= 402) {
                throw new ErrorResponse("An error occurred on the Paragon servers.", 500);
            }

            throw new ErrorResponse("An unknown error occurred.", 500);
        }

        try {
            let token = this.Create(await response.json());

            tracer.addData({
                token: {
                    refresh: {
                        error: false
                    }
                }
            });

            return token;
        }
        catch (e) {
            tracer.addData({
                token: {
                    refresh: {
                        error: true
                    }
                }
            });

            throw e;
        }
    }

    static Create(unformatted: any): Token {
        if ("error" in unformatted)
            throw new Error(unformatted.error);

        let access_token: string;
        if ("access_token" in unformatted)
            access_token = unformatted.access_token;
        else
            throw new Error("No access token present in token");

        let refresh_token: string;
        if ("refresh_token" in unformatted)
            refresh_token = unformatted.refresh_token;
        else
            throw new Error("No refresh token present in token");

        let expiry: Date;
        if ("expiry" in unformatted)
            expiry = new Date(unformatted.expiry);
        else {
            expiry = new Date();

            if ("expires_in" in unformatted)
                expiry.setHours(expiry.getHours() + unformatted.expires_in / 3600);
            else
                expiry.setHours(expiry.getHours() + 1);
        }

        let termination: Date;
        if ("termination" in unformatted)
            termination = new Date(unformatted.termination);
        else {
            termination = new Date();
            //Token lasts 90 days.
            termination.setHours(termination.getHours() + 90 * 24);
        }

        return {
            access_token: access_token,
            refresh_token: refresh_token,
            expiry: expiry,
            termination: termination
        }
    }
}