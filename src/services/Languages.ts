import {en} from "../assets/languages/en";
import {es} from "../assets/languages/es";

export const EN = "en";
export const ES = 'es';

export interface Languages {
    [key :string] :Record<string, string>;
}
export const languages :Languages = {
    en : en,
    es : es
}

export function systemLanguage() :string {
    const locale : string = window.navigator.language;
    if (locale.startsWith("es")) return ES;
    return EN;

}