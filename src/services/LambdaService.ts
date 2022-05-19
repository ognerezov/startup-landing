import AWS, {AWSError} from 'aws-sdk';
import {InvocationResponse} from "aws-sdk/clients/lambda";
import {credentials} from "./AWSConfig";

AWS.config.credentials = credentials;
const lambda = new AWS.Lambda();

export interface StatusCodeHolder {
    statusCode : number
}

export function sendEmail(from : string, subject: string, body : string){
    const params = {
        FunctionName: 'emailMe',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({
            from, subject, body
            }
        )
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