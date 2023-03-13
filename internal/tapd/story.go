
package tapd

type StoryData []map[string]struct {
    Id string `json:"id"`
    Name string `json:"name"`
}

type StoryResp struct {
    ITapdBaseRespon
    Data StoryData `json:"data"`
}

