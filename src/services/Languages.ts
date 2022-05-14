import {en} from "../assets/languages/en";

export const EN = "en";

export interface Languages {
    [key :string] :Record<string, string>;
}
export const languages :Languages = {
    en : en
}