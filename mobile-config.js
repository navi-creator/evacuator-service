App.info({
    //'android-packageName': 'ru.helpmed',
    //'android-versionCode':"131",
    id:"com.helpmed.app",
    //id:"ru.helpmed",
    //'ios-CFBundleIdentifier': "com.helpmed.app",
    buildNumber: "410",
    version: "2.2.5715",
    name: 'Helpmed',
    description: 'Helpmed project.',
    author: 'Golovanov Ilya',
    email: 'connect.golovanov@gmail.com',
    website: 'https://helpmed.ru'
});

App.icons({
    'iphone': 'resources/ios/icon/icon-60.png',
    'iphone_2x': 'resources/ios/icon/icon-60@2x.png',
    'iphone_3x': 'resources/ios/icon/icon-60@3x.png'
});

App.launchScreens({
    'iphone': 'resources/ios/splash/Default~iphone.png',
    'iphone_2x': 'resources/ios/splash/Default@2x~iphone.png',
    'iphone5': 'resources/ios/splash/Default-568h@2x~iphone.png',
    'iphone6': 'resources/ios/splash/Default-667h.png',
    'ipad_landscape': 'resources/ios/splash/Default-Landscape~ipad.png',
    'ipad_portrait_2x': 'resources/ios/splash/Default-Portrait@2x~ipad.png',
    'ipad_portrait': 'resources/ios/splash/Default-Portrait~ipad.png'

});

App.setPreference('AutoHideSplashScreen' ,'false');
App.setPreference('BackupWebStorage' ,'local');
App.setPreference('HideKeyboardFormAccessoryBar', 'true');
App.setPreference('DisallowOverscroll', 'true');
App.setPreference('SplashScreen', 'screen');
App.setPreference('SplashScreenDelay', '10000');
App.setPreference('Fullscreen', 'true');

App.setPreference('KeyboardDisplayRequiresUserAction', 'false');

App.accessRule("blob:*");
App.accessRule('http://dev.helpmed.com/*')
App.accessRule('https://devmeteor.helpmed.com/*')
App.accessRule('http://devmeteor.helpmed.com/*')
App.accessRule('http://mob.helpmed.com/*')

App.accessRule('*.google.com')
App.accessRule('*.googleapis.com')
App.accessRule('*.gstatic.com')
App.accessRule('*.googleusercontent.com')
App.accessRule('google.com/*')
App.accessRule('googleapis.com/*')
App.accessRule('gstatic.com/*')
App.accessRule('googleusercontent.com/*')

App.accessRule('http://nominatim.openstreetmap.org/*')