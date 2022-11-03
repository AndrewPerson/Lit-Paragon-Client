export class ErrorResponse extends Error {
    statusCode: number;
    body: BodyInit;
    headers: HeadersInit;

    constructor(message?: string, statusCode: number = 500, body: BodyInit = message, headers?: HeadersInit, options?: ErrorOptions) {
        super(message, options);

        this.statusCode = statusCode;
        this.body = body;
        this.headers = headers;
    }
}
