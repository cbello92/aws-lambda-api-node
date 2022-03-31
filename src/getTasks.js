const AWS = require('aws-sdk');

module.exports.run = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const response = await dynamodb.scan({
        TableName: 'TaskTable'
    }).promise()

    return {
        status: 200,
        data: response.Items
    }
}