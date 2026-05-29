/* eslint-disable @typescript-eslint/no-require-imports */

const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({
  region: "us-east-1",
});

const docClient =
  DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const okr = {
      okrId: uuidv4(),

      employeeId:
        body.employeeId,

      title:
        body.title,

      description:
        body.description,

      target:
        body.target,

      progress:
        body.progress || 0,

      status:
        body.status ||
        "IN_PROGRESS",

      createdAt:
        new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: "OKRs",
        Item: okr,
      })
    );

    return {
      statusCode: 200,

      headers: {
        "Access-Control-Allow-Origin":
          "*",
      },

      body: JSON.stringify({
        success: true,
        okr,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,

      body: JSON.stringify({
        success: false,
      }),
    };
  }
};