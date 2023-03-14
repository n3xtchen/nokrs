
package tapd

import (
    "net/http"
    "io"
    "golang.org/x/exp/maps"
    "encoding/json"
    "bytes"

    "nokrs/internal/requests"
)

type Tapd[T any] struct {
    uri string
    reqObj map[string]requests.ModifyOptFunc
    response *http.Response
}

type ITapdBaseRespon struct {
    Status int         `json:"status"`
    Info   string      `json:"info"`
    Data   interface{} `json:"data"`
}

const (
    TapdApi string = "https://api.tapd.cn/"
)

func NewTapd[T any](user, pwd, uri string) *Tapd[T] {
    return &Tapd[T]{
        uri: uri,
        reqObj: map[string]requests.ModifyOptFunc{
            "auth": requests.WithAuth(user, pwd),
        },
    }
}

func (c *Tapd[_])  SetParams(params map[string]string) {
    c.reqObj["params"] = requests.WithParams(params)
}

func (c *Tapd[_]) fetch() *http.Response {

    if c.response != nil {
        return c.response
    }

    c.reqObj["headers"] = requests.WithHeaders(map[string]string {
        "Content-Type": "application/json",
    })

    response, _ := requests.Get(TapdApi+c.uri, maps.Values(c.reqObj)...)
    c.response = response

    return response
}

func(c *Tapd[T]) toObj() (*T, error) {
    buf := bytes.NewBuffer([]byte{})
    _, err := io.Copy(buf, c.response.Body)

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

