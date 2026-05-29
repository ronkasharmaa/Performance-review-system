/* eslint-disable @typescript-eslint/no-require-imports */

const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1",
});

const docClient =
  DynamoDBDocumentClient.from(client);

exports.handler = async () => {
  try {
    const result =
      await docClient.send(
        new ScanCommand({
          TableName: "Reviews",
        })
      );

    const reviews =
      result.Items || [];

    const employeeRatings = {};

    reviews.forEach((review) => {
      if (!employeeRatings[review.employeeId]) {
        employeeRatings[
          review.employeeId
        ] = [];
      }

      if (review.rating) {
        employeeRatings[
          review.employeeId
        ].push(review.rating);
      }
    });

    let topPerformer = "";
    let highestAverage = 0;

    Object.entries(
      employeeRatings
    ).forEach(([employeeId, ratings]) => {
      const avg =
        ratings.reduce(
          (sum, r) => sum + r,
          0
        ) / ratings.length;

      if (avg > highestAverage) {
        highestAverage = avg;
        topPerformer = employeeId;
      }
    });

    const allRatings = reviews
  .map((r) => Number(r.rating))
  .filter(
    (rating) =>
      !isNaN(rating) &&
      rating >= 1 &&
      rating <= 5
  );

const averageRating =
  allRatings.length > 0
    ? allRatings.reduce(
        (sum, r) => sum + r,
        0
      ) / allRatings.length
    : 0;

console.log("Ratings:", allRatings);
console.log(
  "Average Rating:",
  averageRating
);

    return {
      statusCode: 200,

      headers: {
        "Access-Control-Allow-Origin":
          "*",

        "Access-Control-Allow-Headers":
          "*",
      },

      body: JSON.stringify({
        totalReviews:
          reviews.length,

        employeesReviewed:
          Object.keys(
            employeeRatings
          ).length,

        averageRating:
          Number(
            averageRating.toFixed(2)
          ),

        topPerformer,

        topPerformerScore:
          Number(
            highestAverage.toFixed(2)
          ),
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