#include <NativeScript/JSIRuntime.h>
using namespace facebook;
using namespace std;

class QuickSQLiteJSIModule {
  public:
    static std::string docPathStr;
    static void install(jsi::Runtime &rt, const char *docPath);
};
