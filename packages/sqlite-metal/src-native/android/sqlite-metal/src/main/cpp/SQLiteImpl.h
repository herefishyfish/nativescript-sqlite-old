#ifndef SQLITE_CORE_SQLITEIMPL_H
#define SQLITE_CORE_SQLITEIMPL_H

#include "Common.h"
#include "Caches.h"
#include "Helpers.h"
#include "sqlite3.h"
#include "ThreadPool.h"
#include "V8Callback.h"
#include "SQLite.h"
#include <cstring>
#include <map>

struct ResolverContext {
    v8::Isolate* isolate;
    v8::Persistent<v8::Promise::Resolver> resolver;
};

class SQLiteImpl {
public:
    SQLiteImpl(sqlite3* db);

    static void Init(v8::Isolate *isolate);

    static SQLiteImpl *GetPointer(v8::Local<v8::Object> object);

    static v8::Local<v8::FunctionTemplate> GetCtor(v8::Isolate *isolate);

    static void Open(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Close(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Delete(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Attach(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Detach(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Transaction(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void Execute(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void ExecuteAsync(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void ExecuteBatch(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void ExecuteBatchAsync(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void LoadFile(const v8::FunctionCallbackInfo<v8::Value> &args);

    static void LoadFileAsync(const v8::FunctionCallbackInfo<v8::Value> &args);

private:
    sqlite3* sqlite_;
    std::string path_;
    ThreadPool* threadPool;

    static v8::Persistent<v8::Function> constructor;

    std::mutex resolverMutex;
    std::condition_variable resolverCondVar;
    std::deque<std::shared_ptr<v8::Persistent<v8::Promise::Resolver>>> resolverQueue;
};

#endif //SQLITE_CORE_SQLITEIMPL_H
