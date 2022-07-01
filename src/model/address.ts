export interface Address{
    address : string
    zip ?: number
    settlement ?: string
    region ?: string
    country ?: string
}
/*
context: Array(4)
0:
id: "postcode.5610123333121050"
text: "46183"
[[Prototype]]: Object
1:
id: "place.5610123333902180"
text: "L'Eliana"
wikidata: "Q1998520"
[[Prototype]]: Object
2:
id: "region.10601999059937860"
short_code: "ES-V"
text: "Valencia"
wikidata: "Q54939"
[[Prototype]]: Object
3:
id: "country.12507185778570100"
short_code: "es"
text: "Spain"
wikidata: "Q29"
 */
export function extractAddress(data : any):Address{
    const res : Address = {
        address : data.place_name
    }

    for(const field of data.context){
        const id : string = field.id
        if(id.startsWith('postcode')){
            res.zip = +field.text;
        } else if (id.startsWith('place')){
            res.settlement = field.text
        } else if (id.startsWith('region')){
            res.region = field.text
        } else if (id.startsWith('country')){
            res.country = field.text
        }
    }
    return res;
}