import {StateId} from "../hooks/validState";
import {User} from "../model/user";

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

export function validatePhone(str : string|undefined) : StateId {
    return isPhone(str) ? undefined : 'Phone.wrong.format'
}

export function validateOTP(otp : number|string|undefined) : StateId {
    if (!otp){
        return 'Login.otp.wrong.format'
    }

    return MIN_OTP < +otp && +otp < MAX_OTP ? undefined : 'Login.otp.wrong.format'
}

export function validateUser(user : User) : StateId{
    return validateEmail(user.email)|| (user.firstName ? undefined : 'Profile.empty.name') || (user.phone ? validatePhone(user.phone) : undefined)
}