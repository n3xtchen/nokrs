package tapd


import (
    "fmt"
    "testing"
)

func TestUser(t *testing.T) {
    tapd := NewTapd[UserResp](tapdUser, tapdPass, "workspaces/users")
    tapd.SetParams(map[string]string {
        "workspace_id": tapdWorkSpace,
        "fields": "user,email,role_id",
    })
    tapd.fetch()
    result, _ := tapd.toObj()
    for _, val := range result.Data {
        fmt.Println(val)
        break
    }
}

