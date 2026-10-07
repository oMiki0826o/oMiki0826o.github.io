## Before you start: invite and permissions

In the Discord Developer Portal, enable the Privileged Gateway Intents required by the modules you use. When inviting the Bot, include at least the bot and applications.commands scopes so Slash Commands can appear.

## First, check that the Bot is online

Once the Bot is running, start with /help, /ping, and /botinfo. /help lists the Slash Commands from the modules that are actually loaded, making it the most reliable entry point when servers enable different features.

## Start with everyday features

Members can begin with /help to see what is available. Depending on the enabled modules, the Bot may offer music playback, self-roles, tickets, messaging tools, document conversion, and AI chat. AI is optional, so there is no need to use it when it has not been configured.

## Operations commands for administrators and the owner

Module status, settings, and Bot health are operational tasks handled by the owner through the configured Prefix commands; the default prefix is $. Start with $help, $bot status, $bot health, $mod list, and $settings status. Never post the Bot token or Gemini API key in Discord, screenshots, or public writing.

## Start with one small feature

You do not need to try every module on the first day. Use `/help` in a test channel and see what this server actually loaded, then begin with something harmless such as `/ping` or `/botinfo`. If a command is missing, wait for Slash Command synchronisation; if it still does not appear, check that the invite included the `applications.commands` scope.

For music, test search, queueing, and stopping in a voice channel where the Bot has the required permissions. Administrators can restrict commands to a dedicated channel and invite a few testers before opening them to everyone. That is easier to reason about than granting every permission and investigating the fallout later.

## Leave useful clues when something fails

When a command does not respond, record the time, server, command, and message shown by the Bot instead of only saying that it is broken. Then check `$bot health` and `$mod list`. If one feature fails while the core remains online, the problem is usually easier to isolate. Never include tokens, API keys, invite links, or member identifiers in a public issue.

## Know which parts depend on the deployment

Features vary with configuration and the host environment: AI needs Gemini settings, music needs FFmpeg, and Minecraft operations need the bridge and local permissions. The commands in this guide describe the project entry points, not a promise that every server enables every module. Treat `/help` and the deployment settings as the source of truth.
