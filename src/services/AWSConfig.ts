import AWS from "aws-sdk";

AWS.config.region = 'eu-west-1';
const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:f460bf79-3d2e-4f9d-b1dc-e8c2c70ff04e'
});
AWS.config.credentials = credentials;
