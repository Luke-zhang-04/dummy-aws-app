package main

import (
	"fmt"
	"os"
	"time"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

// AddDbEntry adds a specific user to the database
func AddDbEntry(sub string) error {
	fmt.Println("Connecting to Database")

	dbDetails := fmt.Sprintf(
		"masterUser:%s@tcp(todo-app.ccqkohsmp9lk.us-east-1.rds.amazonaws.com:3306)/todo-schema",
		os.Getenv("DB_PASSWORD"),
	)

	db, err := sql.Open("mysql", dbDetails)
	if err != nil {
		fmt.Println(fmt.Sprintf("An error occured: %s", err.Error()))
		return err
	}

	db.SetConnMaxLifetime(time.Minute)

	fmt.Println(fmt.Sprintf("Inserting data with %s", sub))

	_, err = db.Exec(
		"INSERT INTO `todo-schema`.user (id) values (?)",
		sub,
	)

	if err != nil {
		fmt.Println(fmt.Sprintf("An error occured: %s", err.Error()))
		return err
	}

    fmt.Println("Success")

    defer db.Close()

	return nil
}
