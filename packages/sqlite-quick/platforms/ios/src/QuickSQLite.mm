#import "QuickSQLite.h"


using namespace facebook::jsi;
using namespace std;

@implementation QuickSQLiteModule

- (void )install {
    NSLog(@"Installing QuickSQLite module...");
     // Get iOS app's document directory (to safely store database .sqlite3 file)
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, true);
    NSString *documentPath = [paths objectAtIndex:0];

    std::shared_ptr<facebook::jsi::Runtime> rt = [JSIRuntime runtime];
    QuickSQLiteJSIModule::install(*rt,[documentPath UTF8String]);
}

@end
