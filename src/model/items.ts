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
    category : string;
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
}

export interface AddItemRequest{
    firstName ?: string;
    lastName ?: string;
    email : string;
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