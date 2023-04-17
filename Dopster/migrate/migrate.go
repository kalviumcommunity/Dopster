package main

import (
	"github.com/Ayush/Dopster/initializers"
	"github.com/Ayush/Dopster/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.Database()
}

func main() {
	initializers.DB.AutoMigrate(&models.Post{})
}
