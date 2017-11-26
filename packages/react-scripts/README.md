# react-scripts-electron-new

This is a fork of [react-scripts](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts) (v1.0.17).
It is modified slightly so that

    yarn start

will open an `electron` instance (v1.7.9) running your react app. Also the webpack `target` has been set to `electron-renderer` so that
your react code and node code run in the same process.

Everything else is exactly as in `create-react app`.

## How to use it

Simply call `create-react-app` with the `--scripts-version` parameter like so:

    create-react-app app --scripts-version react-scripts-electron-new

## This is what you'll get

![Screenshot](https://raw.githubusercontent.com/LukasBombach/react-scripts-electron/electron/documentation/screenshot.png)

## Todo

* Find a better name (react-scripts-electron was already used (yet outdated))
* Add task to create an .app / .exe / .whateverLinuxDoes
