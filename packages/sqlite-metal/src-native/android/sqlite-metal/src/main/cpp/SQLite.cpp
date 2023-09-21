#include "SQLite.h"
#include <sqlite3.h>

using namespace std;

namespace SQLite
{
  sqlite3_stmt *prepare(sqlite3 *db, const std::string &query)
  {
    sqlite3_stmt *statement;
    int statementStatus = sqlite3_prepare_v2(db, query.c_str(), -1, &statement, NULL);

    if (statementStatus != SQLITE_OK)
    {
      throw std::runtime_error("Failed to prepare SQL: " + std::to_string(statementStatus));
    }

    return statement;
  }

  std::vector<DataValue> mapParams(v8::Isolate *isolate, v8::Local<v8::Array> paramsArray)
  {
    std::vector<DataValue> params;

    uint32_t paramsLength = paramsArray->Length();
    for (uint32_t i = 0; i < paramsLength; i++)
    {
      auto item = paramsArray->Get(isolate->GetCurrentContext(), i).ToLocalChecked();
      DataValue param;

      if (item->IsInt32())
      {
        param.value = item->Int32Value(isolate->GetCurrentContext()).ToChecked();
      }
      else if (item->IsNumber())
      {
        param.value = item->NumberValue(isolate->GetCurrentContext()).ToChecked();
      }
      else if (item->IsString())
      {
        param.value = Helpers::ConvertFromV8String(isolate, item); // Adjusted this line assuming ConvertFromV8String takes item as a parameter.
      }
      else if (item->IsArrayBuffer())
      {
        BlobData blob = Helpers::ConvertFromV8ArrayBuffer(isolate, item.As<v8::ArrayBuffer>());
        param.value = blob;
      }
      else
      {
        param.value = nullptr; // nullptr can represent null/none in the variant
      }

      params.push_back(param);
    }

    return params;
  }

  void BindParams(sqlite3_stmt *statement, const std::vector<DataValue> &params)
  {
    for (int i = 0; i < params.size(); i++)
    {
      int parameterIndex = i + 1; // SQLite bind parameters are 1-indexed.
      const auto &param = params[i];

      std::visit([&](auto &&arg)
                 {
                           using T = std::decay_t<decltype(arg)>;
                           if constexpr (std::is_same_v<T, int>) {
                               sqlite3_bind_int(statement, parameterIndex, arg);
                           } else if constexpr (std::is_same_v<T, double>) {
                               sqlite3_bind_double(statement, parameterIndex, arg);
                           } else if constexpr (std::is_same_v<T, std::string>) {
                               sqlite3_bind_text(statement, parameterIndex, arg.c_str(), arg.length(), SQLITE_TRANSIENT);
                           } else if constexpr (std::is_same_v<T, BlobData>) {
                               sqlite3_bind_blob(statement, parameterIndex, arg.first, static_cast<int>(arg.second), SQLITE_TRANSIENT);
                           } else {
                               sqlite3_bind_null(statement, parameterIndex);
                           } },
                 param.value);
    }
  }

  void BindRowData(sqlite3_stmt *statement, const RowData &rowData)
  {
    for (const auto &[columnName, columnData] : rowData.columns)
    {
      int parameterIndex = sqlite3_bind_parameter_index(statement, columnName.c_str());
      if (parameterIndex == 0)
      {
        throw std::runtime_error("Failed to find parameter: " + columnName);
      }

      std::visit([&](auto &&arg)
                 {
            using T = std::decay_t<decltype(arg)>;
            if constexpr (std::is_same_v<T, int>) {
                sqlite3_bind_int(statement, parameterIndex, arg);
            } else if constexpr (std::is_same_v<T, double>) {
                sqlite3_bind_double(statement, parameterIndex, arg);
            } else if constexpr (std::is_same_v<T, std::string>) {
                sqlite3_bind_text(statement, parameterIndex, arg.c_str(), arg.length(), SQLITE_TRANSIENT);
            } else if constexpr (std::is_same_v<T, BlobData>) {
                sqlite3_bind_blob(statement, parameterIndex, arg.first, static_cast<int>(arg.second), SQLITE_TRANSIENT);
            } else {
                sqlite3_bind_null(statement, parameterIndex);
            } },
                 columnData.value);
    }
  }

  std::vector<RowData> fetchRows(sqlite3_stmt *statement)
  {
    std::vector<RowData> rows;

    while (sqlite3_step(statement) == SQLITE_ROW)
    {
      RowData row;

      int num_cols = sqlite3_column_count(statement);
      for (int i = 0; i < num_cols; i++)

      {
        const char *name = sqlite3_column_name(statement, i);
        int type = sqlite3_column_type(statement, i);
        DataValue item;

        switch (type)
        {
        case SQLITE_INTEGER:
          item.value = sqlite3_column_int(statement, i);
          break;
        case SQLITE_FLOAT:
          item.value = sqlite3_column_double(statement, i);
          break;
        case SQLITE_TEXT:
          item.value = std::string(reinterpret_cast<const char *>(sqlite3_column_text(statement, i)));
          break;
        case SQLITE_BLOB:
        {
          int size = sqlite3_column_bytes(statement, i);
          void *data = malloc(size);
          if (!data)
          {
            throw std::runtime_error("Failed to allocate memory for blob data");
          }
          memcpy(data, sqlite3_column_blob(statement, i), size);
          item.value = BlobData(data, size);
          break;
        }
        case SQLITE_NULL:
        default:
          break;
        }

        row.columns[name] = item;
      }
      rows.push_back(row);
    }

    return rows;
  }

  void convertRowToV8(v8::Isolate *isolate, v8::Local<v8::Context> context, const RowData &row, v8::Local<v8::Object> &resultObject)
  {
    v8::Isolate::Scope isolateScope(isolate);
    v8::HandleScope handleScope(isolate);
    v8::Context::Scope contextScope(context);

    for (const auto &[key, dataValue] : row.columns)
    {
      v8::Local<v8::Value> valueObject = std::visit([&](auto &&arg) -> v8::Local<v8::Value>
                                                    {
            using T = std::decay_t<decltype(arg)>;
            if constexpr (std::is_same_v<T, int>) {
                return v8::Integer::New(isolate, arg);
            } else if constexpr (std::is_same_v<T, double>) {
                return v8::Number::New(isolate, arg);
            } else if constexpr (std::is_same_v<T, std::string>) {
                return Helpers::ConvertToV8String(isolate, arg.c_str());
            } else if constexpr (std::is_same_v<T, BlobData>) {
                return Helpers::ConvertToV8ArrayBuffer(isolate, reinterpret_cast<char*>(arg.first), arg.second);
            } else {
                return v8::Null(isolate);
            } },
                                                    dataValue.value);

      resultObject->Set(context, Helpers::ConvertToV8String(isolate, key.c_str()), valueObject);
    }
  }
}
