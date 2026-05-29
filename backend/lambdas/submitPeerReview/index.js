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

    const review = {
      reviewId: uuidv4(),

      reviewType: "PEER",

      reviewerId: body.reviewerId,

      employeeId: body.employeeId,

      feedback: body.feedback,

      rating: body.rating,

      anonymous: body.anonymous,

      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: "Reviews",
        Item: review,
      })
    );

    return {
      statusCode: 200,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },

      body: JSON.stringify({
        success: true,
        review,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },

      body: JSON.stringify({
        success: false,
        message:
          "Failed to submit peer review",
      }),
    };
  }
};