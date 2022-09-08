import AWS, {AWSError} from 'aws-sdk';
import {InvocationResponse} from "aws-sdk/clients/lambda";
import {credentials} from "./AWSConfig";

AWS.config.credentials = credentials;
const lambda = new AWS.Lambda();

export interface StatusCodeHolder {
    statusCode : number
}

export interface EmailParams{
    from : string
    subject : string
    body : string
}

export function sendEmail(data : EmailParams){
    const params = {
        FunctionName: 'emailMe',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify(data)
    };
    // console.log('invoke lambda with params: ' + JSON.stringify(params));
    return new Promise((resolve, reject) => {
        lambda.invoke(params, function(err : AWSError, data : InvocationResponse) {
            if (err) {
                reject(err);
            } else {
                resolve(data.Payload);
            }
        })
    })
}
