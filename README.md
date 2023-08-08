# NSRweb

## How to contribute

This project is written in JavaScript and uses the [Node.js](https://nodejs.org/en/) intepreter.
The first step to contribute is to install node in your machine.

You can find help to install node [here](https://nodejs.dev/learn/how-to-install-nodejs).

If you are on MacOSX, cosider downloading
and installing npm from https://nodejs.org/en/ (mac homebrew package manager doesn't have npm).

Make sure you have `npm` installed before you continue:

```
❯ npm --version
6.14.8
```

After you install `npm` you can proceed and clone this repository.

You also need node:

```
❯ node --version
v18.16.1
```

### How to deploy to Apache

1. Download the deploy.sh script from the repository:

```
https://raw.githubusercontent.com/EnquistLab/NSRweb/main/deploy.sh
```

2. For safety purposes, it is recommended to create a backup of the current version that has been deployed in the Apache folder.

3. Run the script with sudo:

```sh
sudo sh deploy.sh <apache folder>
```

### Project structure

We kept the API calls and logic inside the `actions` folder.
JSX components were kept inside `components`
To add new routes, add a `js` file inside `pages`.

### Development

The `next.config.js` controls which version of the API is being used.
There are three instances of the API: development-public, development-private, and production.

In order to start the development instance, run:

```sh
npm run dev
```

You can find more options inside the package.json file under `scripts`.
