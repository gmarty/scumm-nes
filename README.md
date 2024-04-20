# SCUMM NES resource explorer

> An app to explore the content of the Maniac Mansion game on NES.

## What is this?

This tool is a web app to explore the resources from the Maniac Mansion game on NES.
The goal is to encourage the ROM hacking community to modify the game and create new hacks.

This app only works with Maniac Mansion on NES, it won't work with data files from other platforms or other games.

Some of the code comes from the [ScummVM](https://github.com/scummvm) project.

## What does it do?

It currently support:

- Rooms (partially)
- Room graphics
- Prepositions

The following version are supported:

- American English
- European English
- French
- German
- Italian
- Spanish
- Swedish
- American English prototype (partial support)

The Japanese version is not supported.

## What does it NOT do?

The app doesn't use the runtime code used by the NES to start and play the game. It only works with the SCUMM resources stored in the ROM files.

It does not modify the ROM, it is only an explorer of the resources present in the game.

## Contribute

To run it locally, clone the repo and install the dependencies:

```sh
npm install
```

Start the dev server with:

```sh
npm run dev
```

### Production build

Create a production build with:

```sh
npm run build
```

Then deploy the content of the `dist` folder.

## Future improvements

- Use Typescript.
- Write tests.
- The parsing scripts should be callable from a CLI.
- Parse more resource types (scripts, sounds...).
- QoF improvements (store the ROM files locally...)
- Enable modification of the resources to create new games.

### Out of scope for now

- Cover other SCUMM versions.
