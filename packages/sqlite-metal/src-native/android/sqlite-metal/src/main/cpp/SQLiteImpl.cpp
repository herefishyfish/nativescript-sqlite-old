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
      v8::FunctionTemplate::New(isolate, &Close));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "delete"),
      v8::FunctionTemplate::New(isolate, &Delete));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "attach"),
      v8::FunctionTemplate::New(isolate, &Attach));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "detach"),
      v8::FunctionTemplate::New(isolate, &Detach));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "transaction"),
      v8::FunctionTemplate::New(isolate, &Transaction));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "execute"),
      v8::FunctionTemplate::New(isolate, &Execute));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "executeAsync"),
      v8::FunctionTemplate::New(isolate, &ExecuteAsync));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "executeBatch"),
      v8::FunctionTemplate::New(isolate, &ExecuteBatch));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "executeBatchAsync"),
      v8::FunctionTemplate::New(isolate, &ExecuteBatchAsync));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "loadFile"),
      v8::FunctionTemplate::New(isolate, &LoadFile));
  tmpl->Set(
      Helpers::ConvertToV8String(isolate, "loadFileAsync"),
      v8::FunctionTemplate::New(isolate, &LoadFileAsync));

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
  Helpers::LogToConsole("Hello from C++: " + path);

  sqlite3 *db = nullptr;
  int flags = SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE | SQLITE_OPEN_FULLMUTEX;
  int rc = sqlite3_open_v2(path.c_str(), &db, flags, nullptr);

  if (rc != SQLITE_OK)
  {
    Helpers::LogToConsole("Failed to open database: " + path);
    sqlite3_close(db);
    return;
  }

  auto *impl = new SQLiteImpl(db);
  auto ext = v8::External::New(isolate, impl);

  auto ret = args.This();

  ret->SetInternalField(0, ext);
  args.GetReturnValue().Set(ret);
}

void returnString(const v8::FunctionCallbackInfo<v8::Value> &args, std::string functionName)
{
  v8::Isolate *isolate = args.GetIsolate();
  args.GetReturnValue().Set(Helpers::ConvertToV8String(isolate, functionName.c_str()));
}

void SQLiteImpl::Close(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "Close");
}

void SQLiteImpl::Delete(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "Delete");
}

void SQLiteImpl::Attach(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "Attach");
}

void SQLiteImpl::Detach(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "Detach");
}

void SQLiteImpl::Transaction(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "Transaction");
}

void SQLiteImpl::Execute(const v8::FunctionCallbackInfo<v8::Value> &args) {
    v8::Isolate *isolate = args.GetIsolate();
    auto context = isolate->GetCurrentContext();

    Helpers::LogToConsole("Checking input parameters ...");
    if (args.Length() < 1 || !args[0]->IsString()) {
        Helpers::LogToConsole("Invalid arguments");
        return;
    }

    Helpers::LogToConsole("Convert arguments to C++ types");
    std::string sql = Helpers::ConvertFromV8String(isolate, args[0]);

    SQLiteImpl *impl = GetPointer(args.This());
    if (impl == nullptr) {
        Helpers::LogToConsole("Invalid SQLite instance");
        return;
    }

    sqlite3_stmt *statement;
    int statementStatus = sqlite3_prepare_v2(impl->sqlite_, sql.c_str(), -1, &statement, NULL);

    Helpers::LogToConsole("Handle sqlite3_prepare_v2 result");
    if (statementStatus != SQLITE_OK) {
        Helpers::LogToConsole("SQL preparation error: " + std::string(sqlite3_errmsg(impl->sqlite_)));
        return;
    }

    Helpers::LogToConsole("Binding parameters");
    if (args.Length() > 1 && args[1]->IsArray()) {
       v8::Local<v8::Array> paramsArray = args[1].As<v8::Array>();
       uint32_t paramsLength = paramsArray->Length();
       Helpers::LogToConsole("Number of parameters: " + std::to_string(paramsLength));

       for (int i = 0; i < paramsLength; i++) {
           Helpers::LogToConsole("Processing parameter at index: " + std::to_string(i));
           auto param = paramsArray->Get(context, i).ToLocalChecked();

           if (param->IsString()) {
               v8::String::Utf8Value str(isolate, param);
               if (str.length() > 0) {
                   Helpers::LogToConsole("Parameter at index " + std::to_string(i) + " is a string: " + std::string(*str));
                   sqlite3_bind_text(statement, i + 1, *str, -1, SQLITE_TRANSIENT);
               } else {
                   Helpers::LogToConsole("Parameter at index " + std::to_string(i) + " is an empty string");
                   sqlite3_bind_text(statement, i + 1, "", -1, SQLITE_TRANSIENT);
               }
           } else if (param->IsInt32()) {
               int32_t value = param->Int32Value(isolate->GetCurrentContext()).ToChecked();
               Helpers::LogToConsole("Parameter at index " + std::to_string(i) + " is an int32: " + std::to_string(value));
               sqlite3_bind_int(statement, i + 1, value);
           } else if (param->IsNumber()) {
               double value = param->NumberValue(isolate->GetCurrentContext()).ToChecked();
               Helpers::LogToConsole("Parameter at index " + std::to_string(i) + " is a number: " + std::to_string(value));
               sqlite3_bind_double(statement, i + 1, value);
           } else if (param->IsNull()) {
               Helpers::LogToConsole("Parameter at index " + std::to_string(i) + " is null");
               sqlite3_bind_null(statement, i + 1);
           } else {
               Helpers::LogToConsole("Unsupported value type at index: " + std::to_string(i));
           }
       }
    }

    Helpers::LogToConsole("Execute SQL statement and fetch results");
    v8::Local<v8::Array> resultArray = v8::Array::New(isolate);
    int result;
    int index = 0;
    while ((result = sqlite3_step(statement)) == SQLITE_ROW) {
        v8::Local<v8::Object> row = v8::Object::New(isolate);
        int count = sqlite3_column_count(statement);
        for (int i = 0; i < count; i++) {
            std::string name = sqlite3_column_name(statement, i);
            int type = sqlite3_column_type(statement, i);

            switch (type) {
                case SQLITE_INTEGER:
                case SQLITE_FLOAT:
                    row->Set(context, Helpers::ConvertToV8String(isolate, name), v8::Number::New(isolate, sqlite3_column_double(statement, i)));
                    break;
                case SQLITE_TEXT:
                    row->Set(context, Helpers::ConvertToV8String(isolate, name), Helpers::ConvertToV8String(isolate, (const char *)sqlite3_column_text(statement, i)));
                    break;
                case SQLITE_NULL:
                default:
                    row->Set(context, Helpers::ConvertToV8String(isolate, name), v8::Null(isolate));
                    break;
            }
        }

        resultArray->Set(context, index++, row);
    }

    Helpers::LogToConsole("Finalizing");
    sqlite3_finalize(statement);

    if (result != SQLITE_DONE) {
        Helpers::LogToConsole("SQL execution error: " + std::string(sqlite3_errmsg(impl->sqlite_)));
        return;
    }

    args.GetReturnValue().Set(resultArray);
}

void SQLiteImpl::ExecuteAsync(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "ExecuteAsync");
}

void SQLiteImpl::ExecuteBatch(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "ExecuteBatch");
}

void SQLiteImpl::ExecuteBatchAsync(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "ExecuteBatchAsync");
}

void SQLiteImpl::LoadFile(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "LoadFile");
}

void SQLiteImpl::LoadFileAsync(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "LoadFileAsync");
}
