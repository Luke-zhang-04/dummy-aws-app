package main

/**
Dummy AWS application
License: 0BSD
Author: Luke Zhang luke-zhang-04.github.io
This program is free software: you can redistribute it and/or modify
it under the terms of the 0BSD License
This program is distributed in the hope that it will be useful,
but THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
*/

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
