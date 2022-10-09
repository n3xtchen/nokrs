
package utils

import (
    "io"
    "log"
    "net/http"
    "time"
)

var httpClient = &http.Client{
    Timeout: time.Minute * 1,
    Transport: &http.Transport{
        MaxIdleConns: 10,
        MaxIdleConnsPerHost: 1,
        MaxConnsPerHost: 2,
        IdleConnTimeout: time.Minute * 3,
    },
}

type Auth struct {
    user string
    password string
}

func NewAuth(user, password string) *Auth {
    return &Auth{user: user, password: password}
}

func do(method string, url string, data io.Reader, params map[string]string, header map[string]string, auth *Auth) (*http.Response, error) {

    req, err := http.NewRequest(method, url, data)
    if err != nil {
        log.Println("request failed", err)
        return nil, err
    }

    // header
    if header != nil {
        for key, val := range header {
            req.Header.Add(key, val)
        }
    }

    // auth
    if auth != nil {
        req.SetBasicAuth(auth.user, auth.password)
    }

    // querystring
    if params != nil {
        q := req.URL.Query()
        for key, val := range params {
            q.Add(key, val)
        }
        req.URL.RawQuery = q.Encode()
    }

    response, err := httpClient.Do(req)
    if err != nil {
        return nil, err
    }
    return response, nil
}

func Get(url string, params map[string]string, header map[string]string, auth *Auth) (*http.Response, error) {
    return do("GET", url, nil, params, header, auth)
}

