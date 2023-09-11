# trunner
Test runner for WebdriverIO for quickly executing tests with different capabilities on the command-line

## Overview
`trunner` is simply a wrapper for [WebdriverIO's](https://webdriver.io/) standard test runner
[`wdio`](https://webdriver.io/docs/testrunner/).

This makes it easy to execute tests with different capabilities, say if you frequently switch
testing between multiple devices, instead of having to manually modify and manage multiple test
configuration files. This is primarily focused on mobile testing using [Appium](https://appium.io/).

`trunner` will use existing capabilities defined in `capabilities.json`, combine/overwrite them with
additional capabilities you specify as arguments, and execute the test(s).

## Requirements
- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [WebdriverIO's](https://webdriver.io/)
- [Appium](https://appium.io/)

## Setup
1. Install `trunner` by running `npm -i -g trunner`
2. Add the following imports at the top of your project's `wdio.conf.ts`:

```ts
import { Capabilities } from '@wdio/types'
import caps from './capabilities.json';
```

3. Modify the `capabilities` section in your `wdio.conf.ts` to use the imported capabilities:

```ts
capabilities: [caps as Capabilities.Capabilities],
```

4. Create an empty `capabilities.json` file by running `touch capabilities.json`, or optionally,
configure it from the start, for example:

```json
{
    "platformName": "Android",
    "appium:platformVersion": "13",
    "appium:deviceName": "Pixel 4",
    "appium:automationName": "uiautomator2",
    "appium:uuid": "emulator-5554"
}
```

5. Run tests using `trunner`

## Usage
```
usage: trunner [-h] [-v] [-a APP] [-l LOGLEVEL] [-i] [-f FULLRESET] [-n NORESET] [-s SPEC] [-su SUITE] [-b BAIL]
               [-w WAITFORTIMEOUT] [-p PLATFORMNAME] [-an AUTOMATIONNAME] [-d DEVICENAME] [-pv PLATFORMVERSION]
               [-nct NEWCOMMANDTIMEOUT] [-u UDID]

Test runner for WebdriverIO for quickly executing tests with different capabilities on the command-line

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -a APP, --app APP     App under test, .ipa or .apk
  -l LOGLEVEL, --logLevel LOGLEVEL
                        level of logging verbosity [choices: "trace", "debug", "info", "warn", "error", "silent"]
  -i, --incognito       incognito mode
  -f FULLRESET, --fullReset FULLRESET
                        Perform a complete reset [choices: "true", "false"]
  -n NORESET, --noReset NORESET
                        Don't reset app state before this session [choices: "true", "false"]
  -s SPEC, --spec SPEC  run only a certain spec file - overrides specs piped from stdin [array]
  -su SUITE, --suite SUITE
                        overwrites the specs attribute and runs the defined suite [array]
  -b BAIL, --bail BAIL  stop test runner after specific amount of tests have failed [number]
  -w WAITFORTIMEOUT, --waitforTimeout WAITFORTIMEOUT
                        timeout for all waitForXXX commands [number]
  -p PLATFORMNAME, --platformName PLATFORMNAME
                        The type of platform hosting the app or browser [string]
  -an AUTOMATIONNAME, --automationName AUTOMATIONNAME
                        The name of the Appium driver to use [string]
  -d DEVICENAME, --deviceName DEVICENAME
                        The name of a particular device to automate [string]
  -pv PLATFORMVERSION, --platformVersion PLATFORMVERSION
                        The version of a platform, e.g., for iOS, 16.0 [string]
  -nct NEWCOMMANDTIMEOUT, --newCommandTimeout NEWCOMMANDTIMEOUT
                        The number of seconds the Appium server should wait for clients to send commands before deciding that
                        the client has gone away and the session should shut down [number]
  -u UDID, --udid UDID  Unique device identifier of the connected physical device [string]
```

## Examples
`trunner`

run all tests defined in spec section of `wdio.conf.ts` with existing capabilities in `capabilities.json`

`trunner --spec test/specs/test.e2e.ts`

run test 'test.e2e.ts'

`trunner --fullReset true --app test.ipa --spec test/specs/test.e2e.ts`

clean install and reset the app under test 'test.ipa' on to the test device, run test 'test.e2e.ts'

## Resources
- [WebdriverIO Testrunner](https://webdriver.io/docs/testrunner/)
- [WebdriverIO Capabilities](https://webdriver.io/docs/capabilities/)
- [Appium 2 Capabilities](https://appium.io/docs/en/2.1/guides/caps/)
- [Appium Desired Capabilities](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)

## Author
[Robert Gomez, Jr.](https://github.com/rgomezjnr)

## Source code
https://github.com/rgomezjnr/trunner
