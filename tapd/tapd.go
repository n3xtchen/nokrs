
package tapd

import (
    //"strings"
    "fmt"
    "net/http"
    // "time"
    "io"
    "encoding/json"
    "bytes"

    "nokrs/utils"
)

type Tapd struct {
    user string
    password string
    response *http.Response
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

// func (c *Tapd) setHttpRequest(method string, uri string) *http.Request {
//     r, _ := http.NewRequest(method, TapdApi+uri, nil)
//     r.Header.Add("Content-Type", "application/json")
//     r.SetBasicAuth(c.user, c.password)
//     return r
// }
// 
// func (c *Tapd) Do(method string, uri string) error {
//     req := c.setHttpRequest(method, uri)
//     respone, err := httpClient.Do(req)
//     if err != nil {
//         return err
//     }
// 
//     c.response = respone
//     fmt.Println(respone.Body)
// 
//     return nil
// }

type FetchOptions struct {
    params map[string]string
}

type ModifyOptFunc func(opt *FetchOptions)

func WithParams(params map[string]string) ModifyOptFunc {
    return func(opt *FetchOptions) {
        opt.params = params
    }
}

func (c *Tapd) fetch(uri string, opts ...ModifyOptFunc) *http.Response {

    opt := FetchOptions{
        params: nil,
    }

    for _, fun := range opts {
        fun(&opt)
    }

    if c.response != nil {
        return c.response
    }

    auth := utils.NewAuth(c.user, c.password)
    headers := map[string]string {
        "Content-Type": "application/json",
    }

    response, _ := utils.Get(TapdApi+uri, opt.params, headers, auth)
    c.response = response

    return response
}

type TapdBaseRespon struct {
    Status int         `json:"status"`
    Info   string      `json:"info"`
    Data   interface{} `json:"data"`
}

func (c *Tapd) toObj()  error {
    buf := bytes.NewBuffer([]byte{})
    _, merr := io.Copy(buf, c.response.Body)
    fmt.Println(buf)

    if merr !=nil {
        return merr
    }
    tmp := new(TapdBaseRespon)
    lerr := json.Unmarshal(buf.Bytes(), tmp)
    if lerr != nil {
        return lerr
    }
    fmt.Println(tmp)

    return nil
}

