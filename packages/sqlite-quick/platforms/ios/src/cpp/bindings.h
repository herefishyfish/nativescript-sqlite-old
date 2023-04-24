#include <NativeScript/JSIRuntime.h>
using namespace facebook;

template <typename NativeFunc>
static void createGlobalFunc(jsi::Runtime &jsiRuntime, const char *prop,
                             int paramCount, NativeFunc &&func) {
  auto f = jsi::Function::createFromHostFunction(
      jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, prop), paramCount,
      std::forward<NativeFunc>(func));
  jsiRuntime.global().setProperty(jsiRuntime, prop, std::move(f));
}

#define CREATE_GLOBAL_FUNC(prop, paramCount, func)                             \
  createFunc(jsiRuntime, prop, paramCount, func)

template <typename NativeFunc>
static void createFunc(jsi::Runtime &jsiRuntime, jsi::Object &object,
                       const char *prop, int paramCount, NativeFunc &&func) {
  auto f = jsi::Function::createFromHostFunction(
      jsiRuntime, jsi::PropNameID::forAscii(jsiRuntime, prop), paramCount,
      std::forward<NativeFunc>(func));
  object.setProperty(jsiRuntime, prop, std::move(f));
}

#define CREATE_FUNC(prop, object, paramCount, func)                            \
  createFunc(jsiRuntime, object, prop, paramCount, func);

namespace QuickSQLiteJSIModule {
void install(jsi::Runtime &rt, const char *docPath);
}
