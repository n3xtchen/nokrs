
package tapd

type StoryData []map[string]struct {
    Id string `json:"id"`
    ParentId string `json:"parent_id"`
    Status string `json:"status"`
    Name string `json:"name"`
    Description string `json:"description"`
    Owner string `json:"owner"`
    Creator string `json:"creator"`
    Developer string `json:"developer"`
    Created string `json:"created"`
    Begin string `json:"begin"`
    Due string `json:"due"`
    Completed string `json:"completed"`
    IterationId string `json:"iteration_id"`
}

type StoryResp struct {
    ITapdBaseRespon
    Data StoryData `json:"data"`
}

