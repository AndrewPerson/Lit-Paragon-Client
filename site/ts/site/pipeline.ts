type TransformFunc<InT, MetadataT, OutT> = (x: InT, metadata: MetadataT) => OutT;

export class Pipeline<PipelineInT, MetadataT, PipelineOutT = PipelineInT> {
    private transforms: TransformFunc<any, any, any>[] = [];

    public transform<OutT>(transform: TransformFunc<PipelineOutT, MetadataT, OutT>): Pipeline<PipelineInT, MetadataT, OutT> {
        this.transforms.push(transform);
        return this as any;
    }

    public run(x: PipelineInT, metadata: MetadataT): PipelineOutT {
        // @ts-ignore
        return this.transforms.reduce((x, transform) => transform(x, metadata), x);
    }

    public log() {
        return this.transform(x => {
            console.log(x);
            return x;
        });
    }
}
