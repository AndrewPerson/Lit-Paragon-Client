import { Extensions, Extension } from "../../site/extensions";

export function sortExtensions(data: {name: string, extension: Extension}[], _: unknown): {name: string, extension: Extension}[] {
    return data.sort((a, b) => {
        let first = true;

        let aCanComeFirst: boolean[] = [];
        let bCanComeFirst: boolean[] = [];

        aCanComeFirst.push(Extensions.installedExtensions.has(a.name));
        aCanComeFirst.push(a.extension.preview === false);
        aCanComeFirst.push(a.name > b.name);

        bCanComeFirst.push(Extensions.installedExtensions.has(b.name));
        bCanComeFirst.push(b.extension.preview === false);
        bCanComeFirst.push(b.name > a.name);

        for (let i = 0; i < aCanComeFirst.length; i++) {
            if (aCanComeFirst[i] && !bCanComeFirst[i]) {
                first = true;
                break;
            }
            else if (!aCanComeFirst[i] && bCanComeFirst[i]) {
                first = false;
                break;
            }
        }

        return first ? -1 : 1;
    });
}