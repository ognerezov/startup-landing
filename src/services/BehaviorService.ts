import AWS from 'aws-sdk';
import {ClientInfo} from "./ClientInfo";
import {credentials} from "./AWSConfig";

AWS.config.credentials = credentials;
const sqs = new AWS.SQS();
const QUEUE_URL = 'https://sqs.eu-west-1.amazonaws.com/992648939501/landing-events';
const PROJECT = 'Metrix'

export function report(event : string, ip : string, info : ClientInfo){
    const params = {
        MessageAttributes: {
            "Ip": {
                DataType: "String",
                StringValue: ip
            },
            "Event": {
                DataType: "String",
                StringValue: event
            },
            "Language": {
                DataType: "String",
                StringValue: info.language
            },
            "Agent": {
                DataType: "String",
                StringValue: info.userAgent
            },
            "Project": {
                DataType: "String",
                StringValue: PROJECT
            },
        },
        MessageBody: event,
        QueueUrl: QUEUE_URL
    };
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}