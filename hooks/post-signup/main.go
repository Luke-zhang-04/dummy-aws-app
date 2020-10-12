package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Handler is the lambda function handler
func Handler(
    event events.CognitoEventUserPoolsPostConfirmation,
) (events.CognitoEventUserPoolsPostConfirmation, error) {
    AddDbEntry(event.UserName)

    return event, nil
}

func main() {
	lambda.Start(Handler)
}
