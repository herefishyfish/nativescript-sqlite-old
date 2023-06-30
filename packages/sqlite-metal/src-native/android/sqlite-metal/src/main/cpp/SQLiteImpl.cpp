#include "SQLiteImpl.h"
#include <sqlite3.h>
#include <cstring>

using namespace std;

SQLiteImpl::SQLiteImpl(sqlite3 *sqlite) : sqlite_(sqlite)
{
}

void SQLiteImpl::Init(v8::Isolate *isolate)
{
  v8::Locker locker(isolate);
  v8::Isolate::Scope isolate_scope(isolate);
  v8::HandleScope handle_scope(isolate);

  auto ctor = GetCtor(isolate);
  auto context = isolate->GetCurrentContext();
  auto global = context->Global();
  auto func = ctor->GetFunction(context).ToLocalChecked();
  //  auto open = v8::FunctionTemplate::New(isolate, &Initalize);
  //  func->Set(context, Helpers::ConvertToV8String(isolate, "initialize"),
  //           open->GetFunction(context).ToLocalChecked());
  global->Set(context, Helpers::ConvertToV8String(isolate, "NSCSQLite"), func);
}

SQLiteImpl *SQLiteImpl::GetPointer(v8::Local<v8::Object> object)
{
  auto ptr = object->GetInternalField(0).As<v8::External>()->Value();
  if (ptr == nullptr)
  {
    return nullptr;
  }
  return static_cast<SQLiteImpl *>(ptr);
}

v8::Local<v8::FunctionTemplate> SQLiteImpl::GetCtor(v8::Isolate *isolate)
{
  auto cache = Caches::Get(isolate);
  auto ctor = cache->SQLiteTmpl.get();
  if (ctor != nullptr)
  {
    return ctor->Get(isolate);
  }

  v8::Local<v8::FunctionTemplate> ctorTmpl = v8::FunctionTemplate::New(isolate, &Open);
  ctorTmpl->InstanceTemplate()->SetInternalFieldCount(1);
  ctorTmpl->SetClassName(Helpers::ConvertToV8String(isolate, "NSCSQLite"));

  auto tmpl = ctorTmpl->InstanceTemplate();
  tmpl->SetInternalFieldCount(1);
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "close"),
           v8::FunctionTemplate::New(isolate, &Close)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "delete"),
           v8::FunctionTemplate::New(isolate, &Delete)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "attach"),
           v8::FunctionTemplate::New(isolate, &Attach)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "detach"),
           v8::FunctionTemplate::New(isolate, &Detach)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "transaction"),
           v8::FunctionTemplate::New(isolate, &Transaction)
   );
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "execute"),
      v8::FunctionTemplate::New(isolate, &Execute));
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "executeAsync"),
           v8::FunctionTemplate::New(isolate, &ExecuteAsync)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "executeBatch"),
           v8::FunctionTemplate::New(isolate, &ExecuteBatch)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "executeBatchAsync"),
           v8::FunctionTemplate::New(isolate, &ExecuteBatchAsync)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "loadFile"),
           v8::FunctionTemplate::New(isolate, &LoadFile)
   );
   tmpl->Set(
           Helpers::ConvertToV8String(isolate, "loadFileAsync"),
           v8::FunctionTemplate::New(isolate, &LoadFileAsync)
   );

  cache->SQLiteTmpl =
      std::make_unique<v8::Persistent<v8::FunctionTemplate>>(isolate, ctorTmpl);
  return ctorTmpl;
}

void SQLiteImpl::Open(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  v8::Isolate *isolate = args.GetIsolate();
  auto context = isolate->GetCurrentContext();

  if (args.Length() != 1)
  {
    return;
  }

  std::string path = Helpers::ConvertFromV8String(isolate, args[0]);
  sqlite3 *db = nullptr;
  int rc = sqlite3_open(path.c_str(), &db);

  if (rc != SQLITE_OK)
  {
    sqlite3_close(db);
    return;
  }

  auto *impl = new SQLiteImpl(db);
  auto ext = v8::External::New(isolate, impl);
  auto ret = args.This();

  if (ret->InternalFieldCount() > 0)
  {
    ret->SetInternalField(0, ext);
  }
  else
  {
    ret->SetPrivate(context,
                    v8::Private::New(isolate, Helpers::ConvertToV8String(isolate, "ptr")),
                    ext);
  }
  args.GetReturnValue().Set(ret);
}

static int callback(void *data, int argc, char **argv, char **azColName)
{
  auto isolate = v8::Isolate::GetCurrent();
  auto array = v8::Array::New(isolate);
  for (int i = 0; i < argc; i++)
  {
    auto obj = v8::Object::New(isolate);
    //        obj->Set(isolate->GetCurrentContext(),
    //                 v8::String::NewFromUtf8(isolate, azColName[i]),
    //                 v8::String::NewFromUtf8(isolate, argv[i] ? argv[i] : "NULL"));
    array->Set(isolate->GetCurrentContext(), i, obj);
  }
  ((v8::Persistent<v8::Array> *)data)->Reset(isolate, array);
  return 0;
}

void returnString(const v8::FunctionCallbackInfo<v8::Value> &args, std::string functionName)
{
  v8::Isolate *isolate = args.GetIsolate();
  args.GetReturnValue().Set(Helpers::ConvertToV8String(isolate, functionName.c_str()));
}
void SQLiteImpl::Close(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "Close");
}
void SQLiteImpl::Delete(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "Delete");
}
void SQLiteImpl::Attach(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "Attach");
}
void SQLiteImpl::Detach(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "Detach");
}
void SQLiteImpl::Transaction(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "Transaction");
}
void SQLiteImpl::Execute(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "execute");
  return;

  auto isolate = args.GetIsolate();
  auto context = isolate->GetCurrentContext();
  auto ptr = GetPointer(args.Holder());

  if (ptr != nullptr && args.Length() == 1)
  {
    auto query = Helpers::ConvertFromV8String(isolate, args[0]);

    char *errorMessage = 0;
    v8::Persistent<v8::Array> result;
    int rc = sqlite3_exec(ptr->sqlite_, query.c_str(), callback, &result, &errorMessage);

    if (rc != SQLITE_OK)
    {
      //            isolate->ThrowException(
      //                v8::Exception::Error(
      //                    v8::String::NewFromUtf8(isolate, errorMessage)
      //                )
      //            );
      sqlite3_free(errorMessage);
    }
    else
    {
      args.GetReturnValue().Set(result.Get(isolate));
    }
  }
}

void SQLiteImpl::ExecuteAsync(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "ExecuteAsync");
}
void SQLiteImpl::ExecuteBatch(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "ExecuteBatch");
}
void SQLiteImpl::ExecuteBatchAsync(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "ExecuteBatchAsync");
}
void SQLiteImpl::LoadFile(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "LoadFile");
}
void SQLiteImpl::LoadFileAsync(const v8::FunctionCallbackInfo<v8::Value> &args) {
  returnString(args, "LoadFileAsync");
}
