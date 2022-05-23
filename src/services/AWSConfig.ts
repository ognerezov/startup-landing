import AWS from "aws-sdk";

const region = 'eu-west-1';
export const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:f460bf79-3d2e-4f9d-b1dc-e8c2c70ff04e'
});

AWS.config.update({region})
