export const config = {
    hostname: 'localhost',
    port: 4723,
    path: '/',
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    reporters: ['spec'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '13',
        'appium:app': 'D:\\delux-mami-fe\\app.apk', // đường dẫn đến file apk
        'appium:appPackage': 'com.diepvanthanh.curxormobile', // đổi tên
        'appium:appActivity': 'com.diepvanthanh.curxormobile.MainActivity',//đổi tên
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': true,
        'appium:newCommandTimeout': 300,
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
};