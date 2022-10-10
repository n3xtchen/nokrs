
package tapd

type User []map[string]struct {
    User string `json:"user"`
    Email string `json:"email"`
    RoleId []string `json:"name"`
}

