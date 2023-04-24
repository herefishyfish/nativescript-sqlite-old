#include "bindings.h"
#include "JSIHelper.h"
#include "ThreadPool.h"
#include "logs.h"
#include "macros.h"
#include "sqlbatchexecutor.h"
#include "sqlfileloader.h"
#include "sqliteBridge.h"
#include <iostream>
#include <string>
#include <vector>

using namespace std;

std::string QuickSQLiteJSIModule::docPathStr;

void QuickSQLiteJSIModule::install(jsi::Runtime &rt, const char *docPath) {
  auto module = jsi::Object(rt);
  docPathStr = std::string(docPath);
  auto pool = std::make_shared<ThreadPool>();
  // invoker = jsCallInvoker;

  auto open = HOSTFN("open", 2) {
    if (count == 0)
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][open] database name is required");
    }

    if (!args[0].isString())
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][open] database name must be a string");
    }

    string dbName = args[0].asString(rt).utf8(rt);
    string tempDocPath = string(docPathStr);
    if (count > 1 && !args[1].isUndefined() && !args[1].isNull())
    {
      if (!args[1].isString())
      {
        throw jsi::JSError(rt, "[react-native-quick-sqlite][open] database location must be a string");
      }

      tempDocPath = tempDocPath + "/" + args[1].asString(rt).utf8(rt);
    }

    SQLiteOPResult result = sqliteOpenDb(dbName, tempDocPath);

    if (result.type == SQLiteError)
    {
      throw jsi::JSError(rt, result.errorMessage.c_str());
    }

    return {};
  });

  auto attach = HOSTFN("attach", 4) {
    if(count < 3) {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][attach] Incorrect number of arguments");
    }
    if (!args[0].isString() || !args[1].isString() || !args[2].isString())
    {
      throw jsi::JSError(rt, "dbName, databaseToAttach and alias must be a strings");
      return {};
    }

    string tempDocPath = string(docPathStr);
    if (count > 3 && !args[3].isUndefined() && !args[3].isNull())
    {
      if (!args[3].isString())
      {
        throw jsi::JSError(rt, "[react-native-quick-sqlite][attach] database location must be a string");
      }

      tempDocPath = tempDocPath + "/" + args[3].asString(rt).utf8(rt);
    }

    string dbName = args[0].asString(rt).utf8(rt);
    string databaseToAttach = args[1].asString(rt).utf8(rt);
    string alias = args[2].asString(rt).utf8(rt);
    SQLiteOPResult result = sqliteAttachDb(dbName, tempDocPath, databaseToAttach, alias);

    if (result.type == SQLiteError)
    {
      throw jsi::JSError(rt, result.errorMessage.c_str());
    }

    return {};
  });

  auto detach = HOSTFN("detach", 2) {
    if(count < 2) {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][detach] Incorrect number of arguments");
    }
    if (!args[0].isString() || !args[1].isString())
    {
      throw jsi::JSError(rt, "dbName, databaseToAttach and alias must be a strings");
      return {};
    }

    string dbName = args[0].asString(rt).utf8(rt);
    string alias = args[1].asString(rt).utf8(rt);
    SQLiteOPResult result = sqliteDetachDb(dbName, alias);

    if (result.type == SQLiteError)
    {
      throw jsi::JSError(rt, result.errorMessage.c_str());
    }

    return {};
  });

  auto close = HOSTFN("close", 1)
  {
    if (count == 0)
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][close] database name is required");
    }

    if (!args[0].isString())
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][close] database name must be a string");
    }

    string dbName = args[0].asString(rt).utf8(rt);

    SQLiteOPResult result = sqliteCloseDb(dbName);

    if (result.type == SQLiteError)
    {
      throw jsi::JSError(rt, result.errorMessage.c_str());
    }

    return {};
  });

  auto remove = HOSTFN("delete", 2)
  {
    if (count == 0)
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][open] database name is required");
    }

    if (!args[0].isString())
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][open] database name must be a string");
    }

    string dbName = args[0].asString(rt).utf8(rt);

    string tempDocPath = string(docPathStr);
    if (count > 1 && !args[1].isUndefined() && !args[1].isNull())
    {
      if (!args[1].isString())
      {
        throw jsi::JSError(rt, "[react-native-quick-sqlite][open] database location must be a string");
      }

      tempDocPath = tempDocPath + "/" + args[1].asString(rt).utf8(rt);
    }


    SQLiteOPResult result = sqliteRemoveDb(dbName, tempDocPath);

    if (result.type == SQLiteError)
    {
      throw jsi::JSError(rt, result.errorMessage.c_str());
    }

    return {};
  });

  auto execute = HOSTFN("execute", 3)
  {
    const string dbName = args[0].asString(rt).utf8(rt);
    const string query = args[1].asString(rt).utf8(rt);
    vector<QuickValue> params;
    if(count == 3) {
      const jsi::Value &originalParams = args[2];
      jsiQueryArgumentsToSequelParam(rt, originalParams, &params);
    }

    vector<map<string, QuickValue>> results;
    vector<QuickColumnMetadata> metadata;

    // Converting results into a JSI Response
    try {
      auto status = sqliteExecute(dbName, query, &params, &results, &metadata);

      if(status.type == SQLiteError) {
//        throw std::runtime_error(status.errorMessage);
        throw jsi::JSError(rt, status.errorMessage);
//        return {};
      }

      auto jsiResult = createSequelQueryExecutionResult(rt, status, &results, &metadata);
      return jsiResult;
    } catch(std::exception &e) {
      throw jsi::JSError(rt, e.what());
    }
  });

  // Execute a batch of SQL queries in a transaction
  // Parameters can be: [[sql: string, arguments: any[] | arguments: any[][] ]]
  auto executeBatch = HOSTFN("executeBatch", 2)
  {
    if (sizeof(args) < 2)
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][executeBatch] - Incorrect parameter count");
    }

    const jsi::Value &params = args[1];
    if (params.isNull() || params.isUndefined())
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][executeBatch] - An array of SQL commands or parameters is needed");
    }
    const string dbName = args[0].asString(rt).utf8(rt);
    const jsi::Array &batchParams = params.asObject(rt).asArray(rt);
    vector<QuickQueryArguments> commands;
    jsiBatchParametersToQuickArguments(rt, batchParams, &commands);

    auto batchResult = sqliteExecuteBatch(dbName, &commands);
    if (batchResult.type == SQLiteOk)
    {
      auto res = jsi::Object(rt);
      res.setProperty(rt, "rowsAffected", jsi::Value(batchResult.affectedRows));
      return move(res);
    }
    else
    {
      throw jsi::JSError(rt, batchResult.message);
    }
  });

  auto loadFile = HOSTFN("loadFile", 2)
  {
    const string dbName = args[0].asString(rt).utf8(rt);
    const string sqlFileName = args[1].asString(rt).utf8(rt);

    const auto importResult = importSQLFile(dbName, sqlFileName);
    if (importResult.type == SQLiteOk)
    {
      auto res = jsi::Object(rt);
      res.setProperty(rt, "rowsAffected", jsi::Value(importResult.affectedRows));
      res.setProperty(rt, "commands", jsi::Value(importResult.commands));
      return move(res);
    }
    else
    {
      throw jsi::JSError(rt, "[react-native-quick-sqlite][loadFile] Could not open file");
    }
  });

  module.setProperty(rt, "open", move(open));
  module.setProperty(rt, "close", move(close));
  module.setProperty(rt, "attach", move(attach));
  module.setProperty(rt, "detach", move(detach));
  module.setProperty(rt, "delete", move(remove));
   module.setProperty(rt, "execute", move(execute));
  // module.setProperty(rt, "executeAsync", move(executeAsync));
  module.setProperty(rt, "executeBatch", move(executeBatch));
  // module.setProperty(rt, "executeBatchAsync", move(executeBatchAsync));
  module.setProperty(rt, "loadFile", move(loadFile));
  // module.setProperty(rt, "loadFileAsync", move(loadFileAsync));

  rt.global().setProperty(rt, "QuickSQLiteImpl", move(module));
}
