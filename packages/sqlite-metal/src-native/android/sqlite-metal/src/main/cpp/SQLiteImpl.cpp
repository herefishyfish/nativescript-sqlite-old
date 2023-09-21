#include "SQLiteImpl.h"
#include <sqlite3.h>

using namespace std;

SQLiteImpl::SQLiteImpl(sqlite3 *db) : sqlite_(db)
{
  threadPool = new ThreadPool();
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
  impl->path_ = path;
  auto ext = v8::External::New(isolate, impl);

  auto ret = args.This();

  ret->SetInternalField(0, ext);
  args.GetReturnValue().Set(ret);
}

void returnString(const v8::FunctionCallbackInfo<v8::Value> &args, std::string functionName)
{
  Helpers::LogToConsole(functionName);

  v8::Isolate *isolate = args.GetIsolate();
  args.GetReturnValue().Set(Helpers::ConvertToV8String(isolate, functionName.c_str()));
}

void SQLiteImpl::Close(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  SQLiteImpl *impl = GetPointer(args.This());
  if (impl == nullptr || impl->sqlite_ == nullptr)
  {
    Helpers::LogToConsole("Failed to close database: database is not open.");
    return;
  }

  int closeStatus = sqlite3_close(impl->sqlite_);
  if (closeStatus != SQLITE_OK)
  {
    Helpers::LogToConsole("Failed to close database: " + std::to_string(closeStatus));
    return;
  }

  impl->sqlite_ = nullptr;
}

void SQLiteImpl::Delete(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  v8::Isolate *isolate = args.GetIsolate();
  auto context = isolate->GetCurrentContext();

  SQLiteImpl *impl = GetPointer(args.This());
  if (impl == nullptr || impl->sqlite_ != nullptr)
  {
    Helpers::LogToConsole("Failed to delete database: database is open.");
    return;
  }

  int deleteStatus = std::remove(impl->path_.c_str());
  if (deleteStatus != 0)
  {
    Helpers::LogToConsole("Failed to delete database: " + std::to_string(deleteStatus));
    return;
  }
}

void SQLiteImpl::Attach(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  v8::Isolate *isolate = args.GetIsolate();
  auto context = isolate->GetCurrentContext();

  if (args.Length() < 2 || !args[0]->IsString() || !args[1]->IsString())
  {
    return;
  }

  std::string alias = Helpers::ConvertFromV8String(isolate, args[0]);
  std::string path = Helpers::ConvertFromV8String(isolate, args[1]);

  SQLiteImpl *impl = GetPointer(args.This());
  if (impl == nullptr)
  {
    Helpers::LogToConsole("Failed to attach database: database is not open.");
    return;
  }

  std::string statement = "ATTACH DATABASE '" + path + "' AS " + alias;
  char *errmsg;
  int rc = sqlite3_exec(impl->sqlite_, statement.c_str(), 0, 0, &errmsg);

  if (rc != SQLITE_OK)
  {
    Helpers::LogToConsole("Failed to attach database: " + std::string(errmsg));
    return;
  }
}

void SQLiteImpl::Detach(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  v8::Isolate *isolate = args.GetIsolate();
  auto context = isolate->GetCurrentContext();

  if (args.Length() < 1 || !args[0]->IsString())
  {
    return;
  }

  std::string alias = Helpers::ConvertFromV8String(isolate, args[0]);

  SQLiteImpl *impl = GetPointer(args.This());
  if (impl == nullptr)
  {
    Helpers::LogToConsole("Failed to detach database: database is not open.");
    return;
  }

  std::string statement = "DETACH DATABASE " + alias;
  char *errmsg;
  int rc = sqlite3_exec(impl->sqlite_, statement.c_str(), 0, 0, &errmsg);

  if (rc != SQLITE_OK)
  {
    Helpers::LogToConsole("Failed to detach database: " + std::string(errmsg));
    return;
  }
}

void SQLiteImpl::Transaction(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  returnString(args, "ExecuteAsync");
}

void SQLiteImpl::Execute(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  v8::Isolate *isolate = args.GetIsolate();
  auto context = isolate->GetCurrentContext();
  if (context.IsEmpty() || args.Length() < 1 || !args[0]->IsString())
  {
    return;
  }

  std::string sql = Helpers::ConvertFromV8String(isolate, args[0]);

  SQLiteImpl *impl = GetPointer(args.This());
  if (impl == nullptr)
  {
    Helpers::LogToConsole("Failed to execute SQL: database is not open.");
    return;
  }

  sqlite3_stmt *statement;
  int statementStatus = sqlite3_prepare_v2(impl->sqlite_, sql.c_str(), -1, &statement, NULL);

  // Handle sqlite3_prepare_v2 result
  if (statementStatus != SQLITE_OK)
  {
    Helpers::LogToConsole("Failed to execute SQL: " + std::to_string(statementStatus));
    return;
  }

  // Binding parameters
  if (args.Length() > 1 && args[1]->IsArray())
  {
    v8::Local<v8::Array> paramsArray = args[1].As<v8::Array>();
    uint32_t paramsLength = paramsArray->Length();
    for (int i = 0; i < paramsLength; i++)
    {
      auto param = paramsArray->Get(context, i).ToLocalChecked();

      if (param->IsString())
      {
        v8::String::Utf8Value str(isolate, param);
        if (str.length() > 0)
        {
          sqlite3_bind_text(statement, i + 1, *str, -1, SQLITE_TRANSIENT);
        }
        else
        {
          sqlite3_bind_text(statement, i + 1, "", -1, SQLITE_TRANSIENT);
        }
      }
      else if (param->IsBoolean())
      {
        bool value = param->BooleanValue(isolate);
        sqlite3_bind_int(statement, i + 1, value ? 1 : 0);
      }
      else if (param->IsInt32())
      {
        int32_t value = param->Int32Value(isolate->GetCurrentContext()).ToChecked();
        sqlite3_bind_int(statement, i + 1, value);
      }
      else if (param->IsNumber())
      {
        double value = param->NumberValue(isolate->GetCurrentContext()).ToChecked();
        sqlite3_bind_double(statement, i + 1, value);
      }
      else if (param->IsArrayBuffer())
      {
        auto [data, length] = Helpers::ConvertFromV8ArrayBuffer(isolate, param.As<v8::ArrayBuffer>());
        sqlite3_bind_blob(statement, i + 1, data, length, SQLITE_TRANSIENT);
      }
      else if (param->IsNull())
      {
        sqlite3_bind_null(statement, i + 1);
      }
    }
  }

  // Execute SQL statement and fetch results
  v8::Local<v8::Array> resultArray = v8::Array::New(isolate);
  int result;
  int index = 0;
  while ((result = sqlite3_step(statement)) == SQLITE_ROW)
  {
    v8::Local<v8::Object> row = v8::Object::New(isolate);
    int count = sqlite3_column_count(statement);
    for (int i = 0; i < count; i++)
    {
      std::string name = sqlite3_column_name(statement, i);
      int type = sqlite3_column_type(statement, i);

      switch (type)
      {
      case SQLITE_INTEGER:
        row->Set(context, Helpers::ConvertToV8String(isolate, name), v8::Integer::New(isolate, sqlite3_column_int(statement, i)));
        break;
      case SQLITE_FLOAT:
        row->Set(context, Helpers::ConvertToV8String(isolate, name), v8::Number::New(isolate, sqlite3_column_double(statement, i)));
        break;
      case SQLITE_TEXT:
        row->Set(context, Helpers::ConvertToV8String(isolate, name), Helpers::ConvertToV8String(isolate, (const char *)sqlite3_column_text(statement, i)));
        break;
      case SQLITE_BLOB:
        row->Set(context, Helpers::ConvertToV8String(isolate, name), Helpers::ConvertToV8ArrayBuffer(isolate, (const char *)sqlite3_column_blob(statement, i), sqlite3_column_bytes(statement, i)));
        break;
      case SQLITE_NULL:
      default:
        row->Set(context, Helpers::ConvertToV8String(isolate, name), v8::Null(isolate));
        break;
      }
    }

    resultArray->Set(context, index++, row);
  }

  int finalizeStatus = sqlite3_finalize(statement);
  if (finalizeStatus != SQLITE_OK)
  {
    Helpers::LogToConsole("Failed to finalize statement: " + std::to_string(finalizeStatus));
    return;
  }

  if (result != SQLITE_DONE)
  {
    Helpers::LogToConsole("Failed to execute SQL: " + std::to_string(result));
    return;
  }

  v8::Local<v8::Object> resultObject = v8::Object::New(isolate);
  resultObject->Set(context, Helpers::ConvertToV8String(isolate, "insertId"), v8::Integer::New(isolate, sqlite3_last_insert_rowid(impl->sqlite_)));
  resultObject->Set(context, Helpers::ConvertToV8String(isolate, "rowsAffected"), v8::Integer::New(isolate, sqlite3_changes(impl->sqlite_)));
  // v8::Local<v8::Object> rowsObject = v8::Object::New(isolate);
  // rowsObject->Set(context, Helpers::ConvertToV8String(isolate, "_array"), resultArray);
  // rowsObject->Set(context, Helpers::ConvertToV8String(isolate, "length"), v8::Integer::New(isolate, resultArray->Length()));
  if (resultArray->Length() > 0)
  {
    resultObject->Set(context, Helpers::ConvertToV8String(isolate, "rows"), resultArray);
  }

  args.GetReturnValue().Set(resultObject);
}

void SQLiteImpl::ExecuteAsync(const v8::FunctionCallbackInfo<v8::Value> &args)
{
  v8::Isolate *isolate = args.GetIsolate();
  SQLiteImpl *impl = GetPointer(args.This());
  if (impl == nullptr)
  {
    Helpers::LogToConsole("Failed to execute SQL: database is not open.");
    return;
  }

  v8::String::Utf8Value utf8Query(isolate, args[0]);
  std::string query = *utf8Query;
  std::vector<SQLite::DataValue> mappedParams;
  if (args[1]->IsArray())
  {
    v8::Local<v8::Array> paramsArray = args[1].As<v8::Array>();
    mappedParams = SQLite::mapParams(isolate, paramsArray);
  }

  v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(args[2]);

  auto persistCallback = new v8::Persistent<v8::Function, v8::CopyablePersistentTraits<v8::Function>>(isolate, callback);

  // Execute function in a new thread
  impl->threadPool->enqueue([isolate, impl, persistCallback, query, mappedParams]()
                            {
                                sqlite3_stmt* statement = SQLite::prepare(impl->sqlite_, query);
                                if (!statement)
                                {
                                    Helpers::LogToConsole("Failed to prepare and bind statement.");
                                    return;
                                }

                                SQLite::BindParams(statement, mappedParams);

                                std::vector<SQLite::RowData> results = SQLite::fetchRows(statement);
                                int finalizeStatus = sqlite3_finalize(statement);
                                if (finalizeStatus != SQLITE_OK)
                                {
                                    Helpers::LogToConsole("Failed to finalize statement: " + std::to_string(finalizeStatus));
                                    return;
                                }

                                v8::Locker locker(isolate);
                                v8::Isolate::Scope isolateScope(isolate);
                                v8::HandleScope handleScope(isolate);
                                v8::Local<v8::Function> callback = persistCallback->Get(isolate);
                                v8::Local<v8::Context> context = callback->CreationContext();
                                v8::Context::Scope contextScope(context);

                                v8::Local<v8::Array> resultArray = v8::Array::New(isolate);

                                for (size_t i = 0; i < results.size(); ++i)
                                {
                                  v8::Local<v8::Object> rowObject = v8::Object::New(isolate);
                                  SQLite::convertRowToV8(isolate, context, results[i], rowObject);
                                  resultArray->Set(context, i, rowObject);
                                }

                                v8::Local<v8::Object> resultObject = v8::Object::New(isolate);
                                resultObject->Set(context, Helpers::ConvertToV8String(isolate, "insertId"), v8::Integer::New(isolate, sqlite3_last_insert_rowid(impl->sqlite_)));
                                resultObject->Set(context, Helpers::ConvertToV8String(isolate, "rowsAffected"), v8::Integer::New(isolate, sqlite3_changes(impl->sqlite_)));

                                if (resultArray->Length() > 0)
                                {
                                    resultObject->Set(context, Helpers::ConvertToV8String(isolate, "rows"), resultArray);
                                }

                                const unsigned argc = 2;
                                v8::Local<v8::Value> argv[argc] = {v8::Null(isolate), resultObject};
                                v8::MaybeLocal<v8::Value> maybeResult = callback->Call(context, context->Global(), argc, argv);
                                if (maybeResult.IsEmpty())
                                {
                                    Helpers::LogToConsole("Callback invocation failed.");
                                    return;
                                }

                                persistCallback->Reset();
                                delete persistCallback; });
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

// void SQLiteImpl::ExecuteAsync(const v8::FunctionCallbackInfo<v8::Value> &args)
// {
//   v8::Isolate *isolate = args.GetIsolate();
//   SQLiteImpl *impl = GetPointer(args.This());
//   if (impl == nullptr)
//   {
//     Helpers::LogToConsole("Failed to execute SQL: database is not open.");
//     return;
//   }

//   v8::String::Utf8Value utf8Query(isolate, args[0]);
//   std::string query = *utf8Query;

//   std::vector<std::string> params;
//   if (args[1]->IsArray())
//   {
//     v8::Local<v8::Array> arr = v8::Local<v8::Array>::Cast(args[1]);
//     for (unsigned int i = 0; i < arr->Length(); i++)
//     {
//       v8::String::Utf8Value utf8Param(isolate, arr->Get(isolate->GetCurrentContext(), i).ToLocalChecked());
//       params.push_back(*utf8Param);
//     }
//   }

//   v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(args[2]);

//   auto persistentCallback = new v8::Persistent<v8::Function, v8::CopyablePersistentTraits<v8::Function>>(isolate, callback);

//   Helpers::LogToConsole("Starting new thread");
//   impl->threadPool->enqueue([isolate, persistentCallback, query, params]()
//                             {
//                               Helpers::LogToConsole("Execute");
//                               std::this_thread::sleep_for(std::chrono::seconds(2));

//                               v8::Locker locker(isolate);
//                               v8::Isolate::Scope isolateScope(isolate);
//                               v8::HandleScope handleScope(isolate);

//                               const unsigned argc = 2;
//                               v8::Local<v8::Value> argv[argc] = {v8::Null(isolate), Helpers::ConvertToV8String(isolate, query.c_str())};

//                               v8::Local<v8::Function> callback = persistentCallback->Get(isolate);
//                               v8::Local<v8::Context> context = callback->CreationContext();

//                               v8::MaybeLocal<v8::Value> maybeResult = callback->Call(context, context->Global(), argc, argv);
//                               if (maybeResult.IsEmpty())
//                               {
//                                 Helpers::LogToConsole("Callback invocation failed.");
//                                 return;
//                               }

//                               persistentCallback->Reset();
//                               delete persistentCallback;
//                                });
// }
