export const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const phoneRegExp = RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/);

export function isEmail(str : string|undefined) : boolean {
    return !!str && emailRegExp.test(str)
}

export function isPhone(str : string|undefined) : boolean {
    return !!str && phoneRegExp.test(str)
}
