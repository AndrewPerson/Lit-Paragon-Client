export type Callback<TParamType> = (param: TParamType) => void;

export class Callbacks<TParamType> {
    private _callbacks: Callback<TParamType>[] = [];

    public AddListener(callback: Callback<TParamType>) {
        this._callbacks.push(callback);
    }

    public Invoke(param: TParamType) {
        for (let callback of this._callbacks)
            callback(param);
    }
}