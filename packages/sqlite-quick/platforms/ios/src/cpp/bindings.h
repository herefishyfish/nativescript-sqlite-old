#include <NativeScript/JSIRuntime.h>
using namespace facebook;
using namespace std;

class QuickSQLiteJSIModule {
  public:
    static void install(jsi::Runtime &rt, const char *docPath);
};
