## Starting with an idea

At first I only wanted a Bot that could play music and save me from typing the same commands. Then every small annoyance became a reason to add something: moderation, lookups, Minecraft tools. It slowly stopped resembling the Bot I started with.

## Building while learning

At first I wrote whatever came to mind because making it work was enough. When features started pulling on one another and fixing one place broke another, I had to learn modules, settings, and useful errors. Firefly Bot is still being tidied up, but at least I now know what I am tidying.

## From a Bot to a system

The project now keeps shared infrastructure in `bot/core/`: the Discord client, settings, logging, SQLite, and the Module Loader. User-facing features live under `bot/mod/`. That split was not part of the first version. It became necessary when every feature started needing its own settings, storage, and cleanup path.

The Module Loader scans folders containing `extension.py`, reads their version, display name, and dependencies, then loads them in dependency order. `basic`, `music`, `ai`, and `guild` can assemble themselves without turning `main.py` into one long list of imports. Disabled and failed modules also leave a state in the registry instead of disappearing into a terminal line.

## What the music module taught me

Music began as a play command and grew queues, favourites, natural-language commands, player cleanup, and a database. Its extension now handles configuration, storage, Cogs, and command registration while services, players, and queues hold the playback logic. Unloading must unregister natural commands and disconnect players, otherwise repeated reloads leave duplicate registrations or open voice connections behind.

## Boundaries matter once AI and Minecraft arrive

AI needs providers, storage, permission-aware channel reading, memory, and tools. Minecraft operations need a bridge, local control, and backup/restore. Neither belongs directly in Core. Core owns lifecycle and shared interfaces; each optional module builds its services, handles its errors, and closes its resources. A missing API key or external program should not take `/ping` down with it.

## What is still unfinished

Modularity is not finished when files become smaller. Settings migrations, database schemas, external timeouts, and test environments still need work. I now care whether a feature can be disabled, reloaded, tested, and explained, not only whether it runs on my machine. That is the practical difference between making a Bot and maintaining a system.
