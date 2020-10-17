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
	"testing"
	"time"

	"github.com/joho/godotenv"
)

// TestHandler tests the function handler from ./handler.go
func TestHandler(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		t.Errorf("Failed to load dotenv.")
	}

	err = AddDbEntry(
		fmt.Sprintf("TEST-USER-%d", time.Now().UnixNano()),
	)

	if err != nil {
		t.Errorf(err.Error())
	}
}
