# SCUMM-NES

> An app to explore and modify the game Maniac Mansion on NES.

## What is this?

This tool is a web app to explore and modify the resources contained in the Maniac Mansion game on NES.
The goal is to encourage the ROM hacking community to modify the game and create new hacks.

This app only works with Maniac Mansion on NES, it won't work with SCUMM files from other platforms or other NES games.

Portion of the code comes from [ScummVM](https://github.com/scummvm) and [Maniac Mansion Decoded](https://github.com/gzip/nes-6502-maniac-mansion-decoded).

## What does it do?

It currently support:

- Rooms (partially)
- Room graphics
- Costumes (not yet exposed to the UI)
- Prepositions
- Title screens

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

## How to use it?

On top of the app, there is a command line interface to export the resources to JSON. This is useful to do process or compare the data.

```
node index.js --input path/to/rom --output resources.json
```

Options:

- `--input`, `-i` Path to a ROM or PRG file.
- `--base-rom`, `-b` The base ROM version of the input ROM.
- `--output`, `-o` Path to a JSON filename to be created.
- `--version`, `-v` Print the version number.

## How to contribute?

To run it locally, make sure that node v20 or higher is installed, clone the repo, and install the dependencies:

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
- Write more tests.
- Parse more resource types (sprites, sounds...).
- QoF improvements (store the ROM files locally...)

### Out of scope for now

- Cover other SCUMM versions.
