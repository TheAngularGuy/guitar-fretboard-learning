
# Fretboard Learning

## install & launch

### iOS
Add `#import <FirebaseCore/FIRApp.h>` in `CDVGoogleAnalytics.m`

To debug firebase : product => scheme => edit scheme => arguments => run => write : `-FIRDebugEnabled`

### android
in app/src/res/values/strings.xml add `<string name="google_app_id">1:694642851364:android:20be3a5df8749b5b80e2b1</string>`

To debug run 
`adb shell setprop debug.firebase.analytics.app com.mustaphaAOUAS.FretboardLearning`

To un-debug
`adb shell setprop debug.firebase.analytics.app .none.`

#### Generate android app
```
ionic cordova prepare android --prod --release
```
edit gradle.properties androidX=true
build in android studio *build > generate signed apk > release*
 ```
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/app/release/app-release.apk my-alias
 ```
cd to `platforms/android/app/release/`

```
/Users/mustapha/Library/Android/sdk/build-tools/30.0.3/zipalign -v 4 ./app-release.apk ./app-signes-release.apk
```
(find ~/Library/Android/sdk/build-tools -name "zipalign")


## Stack

- Angular
- Ionic
- Ngxs

## App link

https://apps.apple.com/us/app/fretboard-learning/id1554316449

## Start the project

    npm i
    npm run start

## Connect with me

If you have any feedback or suggestions the [DMs are open 😁](https://twitter.com/TheAngularGuy)

## Contributions

If you want to add something or change something open an issue or send a PR.


