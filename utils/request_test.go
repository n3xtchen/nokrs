package utils


import (
    "fmt"
    "testing"
)

func TestEncoding(t *testing.T) {
    auth := NewAuth("qADsi&JR","9969B926-B56E-79F3-4516-0585A4647EDB")
    fmt.Println(auth)

    response, _ := Get("https://baidu.com", nil, nil, nil)
    fmt.Println(response)
}

