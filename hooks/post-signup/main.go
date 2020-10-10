package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"database/sql"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func handler(event events.CognitoEventUserPoolsPostConfirmation) (events.CognitoEventUserPoolsPostConfirmation, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbDetails := fmt.Sprintf(
		"masterUser:%s@tcp(todo-app.ccqkohsmp9lk.us-east-1.rds.amazonaws.com:3306)/todo-schema",
		os.Getenv("DB_PASSWORD"),
	)

	db, err := sql.Open("mysql", dbDetails)
	if err != nil {
		log.Fatal(err)
	}

	db.SetConnMaxLifetime(time.Minute)

	_, err = db.Exec(
		"INSERT INTO `todo-schema`.user (id, username) values (?, ?)",
		event.Request.UserAttributes["sub"],
		event.UserName,
	)

	if err != nil {
		log.Fatal(err)
	}

	return event, nil
}

func main() {
	lambda.Start(handler)
}
