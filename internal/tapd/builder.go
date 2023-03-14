package tapd

type Builder struct {
    user string
    password string
    User Tapd[UserResp]
    Story Tapd[StoryResp]
}

// func With(user, password string) *Tapd[any] {
//     return NewTapd[UserResp](user, password, "workspaces/users")
// }


