const AWS = require('aws-sdk');

module.exports.run = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const response = await dynamodb.get({
        TableName: 'TaskTable',
        Key: {
            id
        }
    }).promise();

    return {
        status: 200,
        data: response.Item
    }
}