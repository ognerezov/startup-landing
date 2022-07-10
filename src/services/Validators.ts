import {StateId} from "../hooks/validState";

export const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const phoneRegExp = RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/);
export const MIN_OTP = 100000;
export const MAX_OTP = 10*MIN_OTP - 1;


export function isEmail(str : string|undefined) : boolean {
    return !!str && emailRegExp.test(str)
}

export function isPhone(str : string|undefined) : boolean {
    return !!str && phoneRegExp.test(str)
}

export function validateEmail(str : string|undefined) : StateId {
    return isEmail(str) ? undefined : 'Email.wrong.format'
}

export function validateOTP(otp : number|undefined) : StateId {
    return otp && MIN_OTP < otp && otp < MAX_OTP ? undefined : 'Email.wrong.format'
}