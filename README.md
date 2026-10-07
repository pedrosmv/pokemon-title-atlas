# Pokémon Title Atlas

An interactive local desktop tracker for planning title routes for all 493 Pokémon introduced in Generations I–IV.

The app compares audited Shadow Pokémon routes, explains which Ribbon titles and Marks each individual can obtain, highlights route-specific gaps, and saves checklist progress locally in the browser.

## Features

- Candidate-specific title ceilings and documented availability gaps
- Pre-Switch-only, Bank-critical, phase, generation, and pending filters
- English instructions for obtaining every tracked title
- Pixel-art sprites sourced from Pokémon Database
- Collector callouts summarized from the Pokémon Bank exclusives masterpost
- Progress stored locally on the PC with no account, cloud sync, or server-side data collection

## Sources

- [Pokémon Bank Exclusives Masterpost](https://www.reddit.com/r/PokemonHome/comments/1apiuee/pok%C3%A9mon_bank_exclusives_masterpost/)
- [Bulbapedia: List of Ribbons in the games](https://bulbapedia.bulbagarden.net/wiki/List_of_Ribbons_in_the_games)
- [Bulbapedia: List of Shadow Pokémon](https://bulbapedia.bulbagarden.net/wiki/List_of_Shadow_Pok%C3%A9mon)
- [Serebii: Pokémon Champions titles](https://www.serebii.net/pokemonchampions/pokemontitles.shtml)
- [Pokémon Database sprites](https://pokemondb.net/sprites)

## Requirements for source-based launchers

- Node.js 22.13 or newer
- pnpm 11 (enable the version declared by the project with `corepack enable`)

Install dependencies once after cloning:

```bash
pnpm install --frozen-lockfile
```

## Run in development

```bash
pnpm install
pnpm run dev
```

Run the desktop shell against a fresh production build with:

```bash
pnpm run desktop
```

## Run locally on Windows

Double-click `desktop\Run-Pokemon-Title-Atlas.cmd`. The launcher builds the static app, starts a loopback-only server at `http://127.0.0.1:4173`, and opens it in your default browser. Keep the launcher window open while using the tracker; closing it stops the local server.

## Build a standalone executable

On Windows, run `pnpm run desktop:exe` (or `powershell -ExecutionPolicy Bypass -File desktop\build-exe.ps1`). This creates `release\Pokemon-Title-Atlas.exe`, a portable self-extracting launcher that includes the app and its Node runtime. You do not need Node.js installed to run the generated executable. It starts the same loopback-only server and opens the tracker in your default browser. The executable is unsigned, so Windows SmartScreen may display a first-run warning.

The app has no backend and stores checklist progress in the browser's local storage on this PC. Internet access is only used to load Pokémon Database sprite images and to open cited source pages in the default browser.

## Run locally on macOS

From Terminal:

```bash
./desktop/run-pokemon-title-atlas.sh
```

You can also double-click `desktop/Run-Pokemon-Title-Atlas.command` in Finder. If macOS blocks the first launch because the file was downloaded, right-click it and choose **Open** once. Keep the Terminal window open while using the tracker.

## Run locally on Linux

From the project directory:

```bash
./desktop/run-pokemon-title-atlas.sh
```

The launcher builds the static app, starts it only on `127.0.0.1:4173`, and uses `xdg-open` to open the default browser when available. You can always open `http://127.0.0.1:4173/` manually.

## Universal command

On Windows, macOS, or Linux, the equivalent command is:

```bash
pnpm run desktop
```

## Disclaimer

Pokémon and all related names are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. This is an unofficial fan-made planning tool.
