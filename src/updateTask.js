const AWS = require('aws-sdk');

module.exports.run = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { done, title, description } = JSON.parse(event.body);

    let expressionValues = {};
    let updateExpression = [];
    if(done !== null && done !== undefined) {
        expressionValues[':done'] = done;
        updateExpression.push('done = :done');
    }

    if(title) {
        expressionValues[':title'] = title;
        updateExpression.push('title = :title');
    }

    if(description) {
        expressionValues[':description'] = description;
        updateExpression.push('description = :description');
    }

    await dynamodb.update({
        TableName: 'TaskTable',
        Key: {
            id
        },
        UpdateExpression: `set ${updateExpression.join(',')}`,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: 'ALL_NEW'
    }).promise();
    
    return {
        status: 200,
        message: `Task updated successfully`
    }

}