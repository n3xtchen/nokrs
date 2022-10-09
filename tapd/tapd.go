
package tapd

import (
    "fmt"
    "net/http"
    "io"
    "encoding/json"
    "bytes"

    "nokrs/utils"
)

type Tapd[T any] struct {
    user string
    password string
    response *http.Response
}

type TapdBaseRespon[T any] struct {
    Status int         `json:"status"`
    Info   string      `json:"info"`
    Data   T `json:"data"`
}

const (
    TapdApi string = "https://api.tapd.cn/"
)

func NewTapd[T any](user, pwd string) *Tapd[TapdBaseRespon[T]] {
    return &Tapd[TapdBaseRespon[T]]{user: user, password: pwd}
}

func (c *Tapd[_]) fetch(uri string, opts ...utils.ModifyOptFunc) *http.Response {

    if c.response != nil {
        return c.response
    }

    auth := utils.WithAuth(c.user, c.password)
    headers := utils.WithHeaders(map[string]string {
        "Content-Type": "application/json",
    })
    opts = append(opts, auth, headers)

    response, _ := utils.Get(TapdApi+uri, opts...)
    c.response = response

    return response
}

func(c *Tapd[T]) toObj() (*T, error) {
    buf := bytes.NewBuffer([]byte{})
    _, err := io.Copy(buf, c.response.Body)

    fmt.Println(buf)

    if err !=nil {
        return nil, err
    }
    tmp := new(T)
    json.Unmarshal(buf.Bytes(), tmp)
    err = json.Unmarshal(buf.Bytes(), tmp)
    if err != nil {
        return nil, err
    }
    return tmp, nil
}

