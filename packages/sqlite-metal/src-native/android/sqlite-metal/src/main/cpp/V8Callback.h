//
// Created by Dylan on 16/07/2023.
//

#ifndef V8CALLBACK_H
#define V8CALLBACK_H
#pragma once

#include <cassert>
#include <android/looper.h>
#include <unistd.h>
#include <fcntl.h>
#include <v8.h>

struct V8Callback {
    int fd_[2];
    ALooper* looper_;
    v8::Persistent<v8::Promise::Resolver> resolver_;
    v8::Isolate* isolate_;

    V8Callback(v8::Isolate* isolate, v8::Local<v8::Promise::Resolver> resolver) : isolate_(isolate) {
        resolver_.Reset(isolate, resolver);
        auto res = pipe(fd_);
        assert(res != -1);
        res = fcntl(fd_[1], F_SETFL, O_NONBLOCK);
        assert(res != -1);
        looper_ = ALooper_prepare(0);
        ALooper_acquire(looper_);
    }

    ~V8Callback() {
        ALooper_removeFd(looper_, fd_[0]);
        close(fd_[0]);
        ALooper_release(looper_);
        resolver_.Reset();
    }
};

#endif //V8CALLBACK_H
