
package main

import (
    //"strings"
    "fmt"
    // "encoding/base64"
    "net/http"
    // "time"
    "io"
    "encoding/json"
    "bytes"
)

type Tapd struct {
    user string
    password string
    authorization string
}

const (
    TapdApi string = "https://api.tapd.cn/"
)

// var httpClient = &http.Client{
//     Timeout: time.Minute * 1,
//     Transport: &http.Transport{
//         MaxIdleConns: 10,
//         MaxIdleConnsPerHost: 1,
//         MaxConnsPerHost: 2,
//         IdleConnTimeout: time.Minute * 3,
//     },
// }

func NewTapd(user, pwd string) *Tapd {
    return &Tapd{user: user, password: pwd}
}

// func (c *Tapd) setAuth() {
//     str := c.user + ":" + c.password
//     c.authorization = "Basic " + base64.StdEncoding.EncodeToString([]byte(str))
// }

// func (c *Tapd) setHttpRequest(method string, uri string) *http.Request {
//     // if c.authorization == "" {
//     //     c.setAuth()
//     // }
// 
//     r, err := http.NewRequest(method, TapdApi+uri, nil)
//     // r.Header.Add("Authorization", c.authorization)
//     if err != nil {
//         fmt.Println(err)
//     }
//     r.Header.Add("Content-Type", "application/json")
//     r.SetBasicAuth(c.user, c.password)
// 
//     return r
// }

type TestRespon struct {
    Status int `json:"status"`
    Info string `json:"info"`
    Data struct {
        ApiUser string `json:"api_user"`
        ApiPass string `json:"api_password"`
        ResIp string `json:"request_ip"`
    } `json:"data"`
}


func (c *Tapd) Do(method string, uri string) error {
    // req := c.setHttpRequest(method, TapdApi+uri)

    fmt.Println(TapdApi+uri)
    r, aerr := http.NewRequest(method, TapdApi+uri, nil)
    if aerr != nil {
        return aerr
    }
    r.Header.Add("Content-Type", "application/json")
    r.SetBasicAuth(c.user, c.password)


    httpClient := &http.Client{}
    respone, err := httpClient.Do(r)
    if err != nil {
        return err
    }

    fmt.Println(respone.Body)

    buf := bytes.NewBuffer([]byte{})
    _, merr := io.Copy(buf, respone.Body)
    fmt.Println(buf)

    if merr !=nil {
        return merr
    }
    tmp := new(TestRespon)
    lerr := json.Unmarshal(buf.Bytes(), tmp)
    if lerr != nil {
        return lerr
    }
    fmt.Println(tmp.Data)
    fmt.Println(tmp.Info)
    fmt.Println(tmp.Status)
    return nil
}

