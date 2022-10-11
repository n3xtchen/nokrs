
package tapd

type UserData []map[string]struct {
    User string `json:"user"`
    Email string `json:"email"`
    RoleId []string `json:"name"`
}

type UserResp struct {
    ITapdBaseRespon
    Data UserData `json:"data"`
}

