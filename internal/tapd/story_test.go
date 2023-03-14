package tapd


import (
    "fmt"
    "testing"
)

func TestStory(t *testing.T) {
    tapd := NewTapd[StoryResp](tapdUser, tapdPass, "stories")
    tapd.SetParams(map[string]string {
        "workspace_id": tapdWorkSpace,
        "iteration_id": tapdIterationId,
        // "fields": "id,name",
    })
    tapd.fetch()
    result, _ := tapd.toObj()
    for _, val := range result.Data {
        fmt.Println(val["Story"].Name)
        fmt.Println(val["Story"].Creator)
        fmt.Println(val["Story"].Owner)
        fmt.Println(val["Story"].ParentId)
        break
    }
}

