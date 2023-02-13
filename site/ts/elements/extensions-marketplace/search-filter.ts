import { Extension } from "../../site/extensions";

export function filterSearch(data: {name: string, extension: Extension}[], { search }: { search?: string }): {name: string, extension: Extension}[] {
    let normalisedText = search?.trim().toLowerCase() ?? "";
    if (normalisedText === undefined || normalisedText.trim() === "") return data;

    return data.filter(({name, extension}) => {
        return (name.toLowerCase().includes(normalisedText) ?? false) ||
               (extension.description.toLowerCase().includes(normalisedText) ?? false);
    });
}