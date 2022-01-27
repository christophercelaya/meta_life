# meta_life

### for android building
edit line:244 @ [`build.gradle:nodejs-mobile-react-native`](node_modules/nodejs-mobile-react-native/android/build.gradle)
>nativeModulesABIs = ["armeabi-v7a", ~~"x86",~~ "arm64-v8a"~~, "x86_64"~~] as Set<String>;