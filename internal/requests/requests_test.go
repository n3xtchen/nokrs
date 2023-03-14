package requests


import (
    "fmt"
    "testing"
)

func TestEncoding(t *testing.T) {
    response, _ := Get("https://baidu.com")
    fmt.Println(response)
}

