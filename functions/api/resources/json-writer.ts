export class JsonWriter {
    private streamWriter: WritableStreamDefaultWriter;

    private startedObject = false;

    constructor(streamWriter: WritableStreamDefaultWriter) {
        this.streamWriter = streamWriter;
    }

    async startObject() {
        this.startedObject = true;

        await this.streamWriter.write("{");
    }

    endObject() {
        return this.streamWriter.write("}");
    }

    writeKey(key: string) {
        if (this.startedObject) {
            this.startedObject = false;
            return this.streamWriter.write(`"${key}":`);
        }
        else {
            return this.streamWriter.write(`,"${key}":`);
        }
    }

    writeRaw(value: string) {
        return this.streamWriter.write(value);
    }

    writeString(value: string) {
        return this.writeRaw(`"${value}"`);
    }

    writeNumber(value: number) {
        return this.writeRaw(value.toString());
    }

    close() {
        return this.streamWriter.close();
    }
}