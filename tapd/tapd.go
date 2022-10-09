
package tapd

import (
    //"strings"
    "fmt"
    "net/http"
    "time"
    "io"
    "encoding/json"
    "bytes"
)

type Tapd struct {
    user string
    password string
    response *http.Response
}

const (
    TapdApi string = "https://api.tapd.cn/"
)

var httpClient = &http.Client{
    Timeout: time.Minute * 1,
    Transport: &http.Transport{
        MaxIdleConns: 10,
        MaxIdleConnsPerHost: 1,
        MaxConnsPerHost: 2,
        IdleConnTimeout: time.Minute * 3,
    },
}

func NewTapd(user, pwd string) *Tapd {
    return &Tapd{user: user, password: pwd}
}

func (c *Tapd) setHttpRequest(method string, uri string) *http.Request {
    r, _ := http.NewRequest(method, TapdApi+uri, nil)
    r.Header.Add("Content-Type", "application/json")
    r.SetBasicAuth(c.user, c.password)
    return r
}

func (c *Tapd) Do(method string, uri string) error {
    req := c.setHttpRequest(method, uri)
    respone, err := httpClient.Do(req)
    if err != nil {
        return err
    }

    c.response = respone
    fmt.Println(respone.Body)

    return nil
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

