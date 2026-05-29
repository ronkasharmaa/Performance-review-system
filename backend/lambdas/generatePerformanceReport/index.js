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

exports.handler = async (event) => {
  try {
    const employeeId =
      event.pathParameters.employeeId;

    // ==========================
    // FETCH REVIEWS
    // ==========================

    const reviewResult =
      await docClient.send(
        new ScanCommand({
          TableName: "Reviews",
        })
      );

    const reviews =
      (reviewResult.Items || []).filter(
        (review) =>
          review.employeeId === employeeId
      );

    // Self Review
    const selfReview =
      reviews.find(
        (review) =>
          review.reviewType === "SELF"
      );

    // Peer Reviews
    const peerReviews =
      reviews.filter(
        (review) =>
          review.reviewType === "PEER"
      );

    // Manager Review
    const managerReview =
      reviews.find(
        (review) =>
          review.reviewType === "MANAGER"
      );

    const selfScore =
      Number(selfReview?.rating) || 0;

    const peerAverage =
      peerReviews.length > 0
        ? peerReviews.reduce(
            (sum, review) =>
              sum +
              Number(review.rating),
            0
          ) / peerReviews.length
        : 0;

    const managerScore =
      Number(
        managerReview?.rating
      ) || 0;

    // ==========================
    // FETCH OKRs
    // ==========================

    const okrResult =
      await docClient.send(
        new ScanCommand({
          TableName: "OKRs",
        })
      );

    const employeeOKRs =
      (okrResult.Items || []).filter(
        (okr) =>
          okr.employeeId === employeeId
      );

    const okrScore =
      employeeOKRs.length > 0
        ? employeeOKRs.reduce(
            (sum, okr) =>
              sum +
              (
                Number(
                  okr.progress
                ) /
                Number(
                  okr.target
                )
              ) *
                5,
            0
          ) /
          employeeOKRs.length
        : 0;

    // ==========================
    // FINAL WEIGHTED SCORE
    // ==========================

    const finalRating =
      managerScore * 0.4 +
      peerAverage * 0.3 +
      selfScore * 0.2 +
      okrScore * 0.1;

    // ==========================
    // PERFORMANCE STATUS
    // ==========================

    let performanceStatus =
      "Needs Improvement";

    if (finalRating >= 4.5) {
      performanceStatus =
        "Outstanding";
    } else if (
      finalRating >= 4
    ) {
      performanceStatus =
        "Exceeds Expectations";
    } else if (
      finalRating >= 3
    ) {
      performanceStatus =
        "Meets Expectations";
    }

    return {
      statusCode: 200,

      headers: {
        "Access-Control-Allow-Origin":
          "*",

        "Access-Control-Allow-Headers":
          "*",
      },

      body: JSON.stringify({
        employeeId,

        selfScore:
          Number(
            selfScore.toFixed(2)
          ),

        peerAverage:
          Number(
            peerAverage.toFixed(2)
          ),

        managerScore:
          Number(
            managerScore.toFixed(2)
          ),

        okrScore:
          Number(
            okrScore.toFixed(2)
          ),

        finalRating:
          Number(
            finalRating.toFixed(2)
          ),

        performanceStatus,

        totalReviews:
          reviews.length,

        totalOKRs:
          employeeOKRs.length,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,

      headers: {
        "Access-Control-Allow-Origin":
          "*",

        "Access-Control-Allow-Headers":
          "*",
      },

      body: JSON.stringify({
        success: false,

        message:
          "Failed to generate report",
      }),
    };
  }
};