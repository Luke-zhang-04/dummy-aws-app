package main

import (
	"fmt"
	"testing"
	"time"

	"github.com/joho/godotenv"
)

// TestHandler tests the function handler from /.handler.go
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
