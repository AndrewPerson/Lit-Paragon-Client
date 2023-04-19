export type Callback<TParamTypes extends Array<unknown> = [], TReturnType=void> = (...params: TParamTypes) => TReturnType;

export class Callbacks<TParamTypes extends Array<unknown> = [], TReturnType=void> {
    private _callbacks: Callback<TParamTypes, TReturnType>[] = [];

    public add(callback: Callback<TParamTypes, TReturnType>) {
        this._callbacks.push(callback);
    }

    public remove(callback: Callback<TParamTypes, TReturnType>) {
        const index = this._callbacks.indexOf(callback);
        if (index != -1) this._callbacks.splice(index, 1);
    }

    public invoke(...params: TParamTypes): TReturnType[] {
        return [...this.invokeLazy(...params)]
    }

    public* invokeLazy(...params: TParamTypes): Generator<TReturnType, void, unknown> {
        for (const callback of this._callbacks) {
            try {
                yield callback(...params);
            }
            catch (_) { }
        }
    }
}