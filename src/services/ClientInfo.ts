import detectBrowser from './DetectBrowser';

export interface IClientInfo {
    browser : string,
    language : string,
    os : string,
    userAgent: string
}
export class ClientInfo implements IClientInfo{
    browser: string;
    language: string;
    os: string;
    userAgent: string;


    constructor(browser: string, language: string, os: string, userAgentString: string) {
        this.browser = browser;
        this.language = language;
        this.os = os;
        this.userAgent = userAgentString;
    }
}

export const getClientInfo = () =>{
    return new ClientInfo(
        detectBrowser(),
        window.navigator.language,
        window.navigator.platform,
        window.navigator.userAgent
    )
}
