package tapd

import (
    "fmt"
    "github.com/joho/godotenv"
    "log"
    "os"
    "testing"
)

var tapdUser string
var tapdPass string
var tapdWorkSpace string
var tapdIterationId string

func TestMain(m *testing.M) {
    // 在这里进行测试程序的设置操作
    fmt.Println("Test Tapd setup...")

    err := godotenv.Load("../../.env.test")
    if err != nil {
        log.Fatal(err)
        os.Exit(-1)
    }

    tapdUser = os.Getenv("TAPD_USER")
    tapdPass = os.Getenv("TAPD_PASS")
    tapdWorkSpace = os.Getenv("TAPD_WORKSPACE")
    tapdIterationId = os.Getenv("TAPD_ITERATION_ID")

    if (tapdUser == "" || tapdPass == "" || tapdWorkSpace == "" ) {
        os.Exit(-1)
    }

    // 运行测试程序
    exitCode := m.Run()

    // 在这里进行测试程序的清理操作
    fmt.Println("Test Tapd cleanup...")

    // 退出测试程序
    os.Exit(exitCode)
}
