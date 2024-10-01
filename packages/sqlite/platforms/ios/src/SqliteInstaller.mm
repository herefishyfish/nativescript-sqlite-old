#import "SqliteInstaller.h"
#import <NativeScript/runtime/Runtime.h>
#import "sqlite.h"


@implementation SqliteInstaller

+ (void) install {
    v8::Isolate* isolate = tns::Runtime::GetCurrentRuntime()->GetIsolate();
    sqlite::install(isolate);
}

@end
