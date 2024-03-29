export interface Item{
    id : number;
    name : string;
    price : number;
    description : string;
    owner : number;
    placeId : number;
    pictures : string;
    categoryId : number;
    vendor : number;
    model : number;
    data : string;
    pricePerHour : number;
    pricePerDay : number;
    pricePerWeek : number;
    pricePerMonth : number;
    pricePerYear : number;
    availability : string;
    firstName : string;
    lastName : string;
    email : string;
    phone : string;
    avatar : string;
    category : number;
    placePicture : string;
    lat : number;
    lon  : number;
    country : string;
    region : string;
    settlement : string;
    zip : number;
    street : string;
    address : string;
    building : string;
    apartment: string;
    room: string;
    floor  : number;
    ownerAvailability : string;
}
export interface EditItemRequest extends AddItemRequest{
    id ?: number
}

export interface AddItemRequest{
    file ?: File;
    phone ?: string;

    lat : number;
    lon  : number;

    name : string;
    price ?: number;
    description ?: string;
    pricePerHour ?: number;
    pricePerDay ?: number;
    pricePerWeek ?: number;
    pricePerMonth ?: number;
    pricePerYear ?: number;

    owner ?: number;
    place ?: number;
    category ?: number;
    vendor ?: number;
    model ?: number;

    data ?: string;
    availability ?: string;

    country ?: string;
    region ?: string;
    settlement ?: string;
    zip ?: number;
    street ?: string;
    address ?: string;
    building ?: string;
    apartment?: string;
    room?: string;
    floor  ?: number;
}
export function prepared(item : AddItemRequest):AddItemRequest{
    return {
        ...item,
        pricePerHour : item.pricePerHour ? item.pricePerHour  * 100 : item.pricePerHour,
        pricePerDay : item.pricePerDay ? item.pricePerDay  * 100 : item.pricePerDay,
        pricePerWeek : item.pricePerWeek ? item.pricePerWeek  * 100 : item.pricePerWeek,
        pricePerMonth : item.pricePerMonth ? item.pricePerMonth  * 100 : item.pricePerMonth,
        pricePerYear : item.pricePerYear ? item.pricePerYear  * 100 : item.pricePerYear
    }
}

export function toFormData(item : any) : FormData{
    const data = new FormData()
    Object.keys(item).forEach(key=>{
        const val = item[key];
        if (val !== undefined){
            data.append(key,val)
        }
    })

    return data;
}

export function isValid(item : AddItemRequest): boolean{
    return typeof (item.category) === 'number' &&
        !!item.name &&
        !!item.file &&
        !!(item.pricePerHour || item.pricePerDay || item.pricePerWeek)
}

export function isValidItem(item : Item): boolean{
    return item.categoryId > 0 &&
        !!item.name &&
        !!(item.pricePerHour || item.pricePerDay || item.pricePerWeek)
}
