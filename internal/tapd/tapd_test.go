
package tapd

import (
    "fmt"
    "testing"
)

type TestData struct {
    ITapdBaseRespon
    Data struct {
        ApiUser string `json:"api_user"`
        ApiPass string `json:"api_password"`
        ResIp string `json:"request_ip"`
    } `json:"data"`
}

func TestAuth(t *testing.T) {
    tapd := NewTapd[TestData](tapdUser, tapdPass, "quickstart/testauth")
    tapd.fetch()
    fmt.Println(tapd.toObj())
}

