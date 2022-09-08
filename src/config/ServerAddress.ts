export const DEVELOPMENT_URL : string = 'localhost:8080/v1/';
//export const DEVELOPMENT_URL : string = '192.168.1.80:8080/v1/';
// export const PRODUCTION_URL : string = '89kkdndqhb.execute-api.eu-west-1.amazonaws.com/v1/';
export const PRODUCTION_URL : string = 'rentsby.com/v1/';


export const PRODUCTION_HOME_URL : string = 'rentsby.com';
export const DEVELOPMENT_HOME_URL : string = 'localhost:3000';
// export const DEVELOPMENT_HOME_URL : string = '89kkdndqhb.execute-api.eu-west-1.amazonaws.com';

export const IMAGE_CLOUDFRONT_URL = 'https://d2g79p4t72w59h.cloudfront.net/'
export const THUMBNAIL_CLOUDFRONT_URL = 'https://d2qk3mwcnqg7zi.cloudfront.net/'

export enum Method {
    GET,
    POST,
    PUT,
    DELETE,
    SAVE,
    HEAD,
    OPTIONS,
    CONNECT,
    CHECK
}
export enum Protocol{
    Http = 'http://',
    Https ='https://'
}

export function goToPath(path : string){
    window.open(getHome() + path, "_blank")
}

export function goHome(){
    window.open(getHome(),"_self")
}

export function goToItem(id : string|number){
    goToPath("/item/"+id)
}

export function goToCategory(id : string|number){
    goToPath("/category/"+id)
}

export function getUrl(path : string) : string{
    if (isLambda(path)){
        return Protocol.Https + PRODUCTION_URL  + path
    }
    return getProtocol() + getBaseUrl() + path;
}

export function getBaseUrl():string {
    return process.env.NODE_ENV === 'development' ?  DEVELOPMENT_URL: PRODUCTION_URL;
}

export function isLambda(path ?:string){
    return path && path.startsWith("user")
}

export function getHome():string {
    return getProtocol() + (process.env.NODE_ENV === 'development' ? DEVELOPMENT_HOME_URL : PRODUCTION_HOME_URL);
}

export function getProtocol():Protocol {
    return process.env.NODE_ENV === 'development' ? Protocol.Http : Protocol.Https;
}

