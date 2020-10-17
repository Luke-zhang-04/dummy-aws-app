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
