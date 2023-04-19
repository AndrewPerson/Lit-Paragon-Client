import { Extension } from "../../site/extensions";

export function filterSearch(data: Extension[], { search }: { search?: string }) {
    const normalisedText = search?.trim().toLowerCase() ?? "";
    if (normalisedText === undefined || normalisedText.trim() === "") return data;

    return data.filter(extension => {
        return (extension.name.toLowerCase().includes(normalisedText) ?? false) ||
               (extension.description.toLowerCase().includes(normalisedText) ?? false);
    });
}