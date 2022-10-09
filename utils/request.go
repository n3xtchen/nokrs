
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

type RequestOptions struct {
    data io.Reader
    params map[string]string
    headers map[string]string
    auth *Auth
}

type ModifyOptFunc func(opt *RequestOptions)

func WithData(data io.Reader) ModifyOptFunc {
    return func(opts *RequestOptions) {
        opts.data = data
    }
}

func WithParams(params map[string]string) ModifyOptFunc {
    return func(opts *RequestOptions) {
        opts.params = params
    }
}

func WithHeaders(headers map[string]string) ModifyOptFunc {
    return func(opts *RequestOptions) {
        opts.headers = headers
    }
}

func WithAuth(user, password string) ModifyOptFunc {
    return func(opts *RequestOptions) {
        opts.auth =  &Auth{user: user, password: password}
    }
}

// func do(method string, url string, data io.Reader, params map[string]string, headers map[string]string, auth *Auth) (*http.Response, error) {
func do(method string, url string, opts ...ModifyOptFunc) (*http.Response, error) {

    rOpts := RequestOptions{
        params: nil,
        data: nil,
        headers: nil,
        auth: nil,
    }

    for _, fun := range opts {
        fun(&rOpts)
    }

    req, err := http.NewRequest(method, url, rOpts.data)
    if err != nil {
        log.Println("request failed", err)
        return nil, err
    }

    // header
    if rOpts.headers != nil {
        for key, val := range rOpts.headers {
            req.Header.Add(key, val)
        }
    }

    // auth
    if rOpts.auth != nil {
        req.SetBasicAuth(rOpts.auth.user, rOpts.auth.password)
    }

    // querystring
    if rOpts.params != nil {
        q := req.URL.Query()
        for key, val := range rOpts.params {
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

func Get(url string, opts ...ModifyOptFunc) (*http.Response, error) {
    return do("GET", url, opts...)
}

