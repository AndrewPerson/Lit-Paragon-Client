import { Extension, Extensions } from "../../site/extensions";

export function filterPreviewExtensions(data: Extension[], { allowPreviewExtensions }: { allowPreviewExtensions: boolean }) {
    if (allowPreviewExtensions) return data;
    else return data.filter(extension => !extension.preview || Extensions.installedExtensions.has(extension.name));
}