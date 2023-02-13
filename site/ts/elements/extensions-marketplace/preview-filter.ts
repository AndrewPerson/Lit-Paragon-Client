import { Extension, Extensions } from "../../site/extensions";

export function filterPreviewExtensions(data: {name: string, extension: Extension}[], { allowPreviewExtensions }: { allowPreviewExtensions: boolean }): {name: string, extension: Extension}[] {
    if (allowPreviewExtensions) return data;
    else return data.filter(({name, extension}) => !extension.preview || Extensions.installedExtensions.has(name));
}