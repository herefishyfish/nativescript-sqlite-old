@echo off
"C:\\Users\\Dylan\\AppData\\Local\\Android\\Sdk\\cmake\\3.18.1\\bin\\cmake.exe" ^
  "-HC:\\Users\\Dylan\\Code\\NativeScript\\fishqlite\\packages\\sqlite\\src-native\\android" ^
  "-DCMAKE_SYSTEM_NAME=Android" ^
  "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON" ^
  "-DCMAKE_SYSTEM_VERSION=17" ^
  "-DANDROID_PLATFORM=android-17" ^
  "-DANDROID_ABI=arm64-v8a" ^
  "-DCMAKE_ANDROID_ARCH_ABI=arm64-v8a" ^
  "-DANDROID_NDK=C:\\Users\\Dylan\\AppData\\Local\\Android\\Sdk\\ndk\\21.4.7075529" ^
  "-DCMAKE_ANDROID_NDK=C:\\Users\\Dylan\\AppData\\Local\\Android\\Sdk\\ndk\\21.4.7075529" ^
  "-DCMAKE_TOOLCHAIN_FILE=C:\\Users\\Dylan\\AppData\\Local\\Android\\Sdk\\ndk\\21.4.7075529\\build\\cmake\\android.toolchain.cmake" ^
  "-DCMAKE_MAKE_PROGRAM=C:\\Users\\Dylan\\AppData\\Local\\Android\\Sdk\\cmake\\3.18.1\\bin\\ninja.exe" ^
  "-DCMAKE_CXX_FLAGS=-O2 -frtti -fexceptions -Wall -Wno-unused-variable -fstack-protector-all" ^
  "-DCMAKE_LIBRARY_OUTPUT_DIRECTORY=C:\\Users\\Dylan\\Code\\NativeScript\\fishqlite\\packages\\sqlite\\src-native\\android\\build\\intermediates\\cxx\\Debug\\5i2cc45e\\obj\\arm64-v8a" ^
  "-DCMAKE_RUNTIME_OUTPUT_DIRECTORY=C:\\Users\\Dylan\\Code\\NativeScript\\fishqlite\\packages\\sqlite\\src-native\\android\\build\\intermediates\\cxx\\Debug\\5i2cc45e\\obj\\arm64-v8a" ^
  "-DCMAKE_BUILD_TYPE=Debug" ^
  "-BC:\\Users\\Dylan\\Code\\NativeScript\\fishqlite\\packages\\sqlite\\src-native\\android\\.cxx\\Debug\\5i2cc45e\\arm64-v8a" ^
  -GNinja ^
  "-DANDROID_TOOLCHAIN=clang" ^
  "-DANDROID_STL=c++_shared" ^
  "-DNATIVESCRIPT_SO_PATH=C:\\Users\\Dylan\\Code\\NativeScript\\fishqlite\\packages\\sqlite\\src-native\\android/nativescript-regular.aar"
