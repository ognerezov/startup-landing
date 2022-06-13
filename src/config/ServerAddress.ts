export const DEVELOPMENT_URL : string = 'localhost:8080/v1/';
export const PRODUCTION_URL : string = 'nau-mag.com/v1/';


export const PRODUCTION_HOME_URL : string = 'nau-mag.com';
export const DEVELOPMENT_HOME_URL : string = 'localhost:3000';

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

export function getUrl(path : string) : string{
    return getProtocol() + getBaseUrl() + path;
}

export function getBaseUrl():string {
    return process.env.NODE_ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL;
}

export function getHome():string {
    return getProtocol() + (process.env.NODE_ENV === 'development' ? DEVELOPMENT_HOME_URL : PRODUCTION_HOME_URL);
}

export function getProtocol():Protocol {
    return process.env.NODE_ENV === 'development' ? Protocol.Http : Protocol.Https;
}

