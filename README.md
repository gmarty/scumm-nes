# SCUMM-NES

> An app to explore and modify the game Maniac Mansion on NES.

## What is this?

This tool is a web app to explore and modify the resources contained in the Maniac Mansion game on NES.
The goal is to encourage the ROM hacking community to modify the game and create new ROM hacks or translations based on this game.

This app only works with Maniac Mansion on NES, it won't work with SCUMM files from other platforms or other NES games.

Portion of the code comes from [ScummVM](https://github.com/scummvm) and [Maniac Mansion Decoded](https://github.com/gzip/nes-6502-maniac-mansion-decoded).

## What does it do?

It currently supports:

- Rooms (partially)
- Title screens
- Graphics
- Costumes
- Prepositions

The following version are supported:

- American English
- European English
- French
- German
- Italian
- Spanish
- Swedish
- American English prototype

The Japanese version is not supported as it doesn't use SCUMM but implements its own engine instead.

## What does it NOT do?

The app doesn't use the runtime code used by the NES to start and play the game. It only works with the SCUMM resources stored in the ROM files.

## What can you modify in the game?

At this stage, only the room palettes can be modified. Click on any colour to display a colour picker.

When you're happy with your changes, export a ROM file with the download icon on the top left corner.

## How to use it?

On top of the app, there is a command line interface to export the resources to JSON. This is useful to process or compare the data.

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
- Parse more resource types (charset, sounds...).
- Make more elements modifiable.
- QoF improvements (store the ROM files locally...)

### Out of scope for now

- Cover other SCUMM versions.
