import axios from "axios";

export type Token = {
    access_token: string,
    refresh_token: string,
    expiry: Date,
    termination: Date,
    iteration: number,
    previousToken?: Token;
}

export class TokenFactory {
    static async Refresh(token: Token, client_id: string, client_secret: string): Promise<Token> {
        let response = await axios.post("https://student.sbhs.net.au/api/token", new URLSearchParams({
            refresh_token: token.refresh_token,
            grant_type: "refresh_token",
            client_id: client_id,
            client_secret: client_secret
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return this.Create(response.data, token.iteration + 1);
    }

    static Create(unformatted: any, iteration: number = 1, previousToken?: Token): Token {
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
            termination: termination,
            iteration: iteration,
            previousToken: previousToken
        }
    }
}