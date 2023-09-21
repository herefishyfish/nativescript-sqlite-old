#pragma once

#include "Common.h"
#include "Caches.h"
#include "Helpers.h"
#include "sqlite3.h"
#include "ThreadPool.h"
#include <cstring>
#include <variant>
#include <map>

namespace SQLite
{
  enum DataType
  {
    DT_INT,
    DT_FLOAT,
    DT_STRING,
    DT_BLOB,
    DT_NULL
  };

  using BlobData = std::pair<void *, size_t>;

  struct DataValue
  {
    using ValueVariant = std::variant<int, double, std::string, BlobData>;
    ValueVariant value;
  };

  struct RowData
  {
    std::map<std::string, DataValue> columns;
  };

  sqlite3_stmt *prepare(sqlite3 *db, const std::string &query);
  std::vector<DataValue> mapParams(v8::Isolate *isolate, v8::Local<v8::Array> paramsArray);
  void BindParams(sqlite3_stmt *statement, const std::vector<DataValue> &params);
  void BindRowData(sqlite3_stmt *statement, const RowData &rowData);
  std::vector<RowData> fetchRows(sqlite3_stmt *statement);
  void convertRowToV8(v8::Isolate *isolate, v8::Local<v8::Context> context, const RowData &row, v8::Local<v8::Object> &result);
}
