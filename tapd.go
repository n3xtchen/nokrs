
package main

import (
    "strings"
    // "fmt"
    "encoding/base64"
    "net/http"
    // "time"
)

type Tapd struct {
    user string
    password string
    authorization string
}

const (
    TapdApi string = "https://api.tapd.cn/"
)

// var httpClient = &http.httpClient{
//     Timeout: time.Minute * 1
//     Transport: &http.Transport{
//         MaxIdleConns: 10,
//         MaxIdleConnsPerHost: 1,
//         MaxConnsPerHost: 2,
//         IdleConnTimeout: time.Minute * 3
//     }
// }

func NewTapd(user, pwd string) *Tapd {
    return &Tapd{user: user, password: pwd}
}

func (c *Tapd) setAuth() {
    str := c.user + ":" + c.password
    c.authorization = "Basic " + base64.StdEncoding.EncodeToString([]byte(str))
}

func (c *Tapd) setHttpRequest(method string, uri string, data *strings.Reader) *http.Request {
    if c.authorization == "" {
        c.setAuth()
    }

    r, _ := http.NewRequest(method, TapdApi+uri, data)
    r.Header.Add("Authorization", c.authorization)
    r.Header.Add("Content-Type", "application/x-www-form-urlencoded")

    return r
}

