# @withorbit/app

This package contains the main Orbit GUI app for the web, iOS, Android, and macOS. It's built on react-native (via a bare Expo project); the web app is built with react-native-web.

* Local development
    * To run the Orbit web app: `yarn run web`
    * To run the Orbit iOS app on the simulator: `yarn run ios`
       * (You'll need to `cd ios; pod install` first)
    * To run the Orbit iOS app on an attached device: `yarn run ios --device [device name]`
    * To run the Orbit macOS app: `yarn run ios --device YOUR_MAC_DEVICE_NAME`
* Deployment
    * To deploy the Orbit web app: `yarn run deploy:web`

Unsure what a device's name is? Run `instruments -s devices`.

You'll need to copy Orbit's commercial fonts into `/web/fonts` and `/android/app/src/main/assets`. The license doesn't permit me to distribute them with the repository.