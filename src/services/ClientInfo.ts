export interface ClientInfo {
    browser ?: string,
    language : string,
    userAgent: string
}

export const getClientInfo = ():ClientInfo => {
    return {
        language :window.navigator.language,
        userAgent: window.navigator.userAgent
    }
}
