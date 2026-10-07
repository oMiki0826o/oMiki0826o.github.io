## Understand how a Module is discovered

The Bot scans folders under bot/mod/. A folder must have a valid Python identifier as its name and contain extension.py before the loader treats it as a loadable Module.

For example, a reminder feature can begin in bot/mod/reminder/. Do not put feature code into Core, and do not turn one large file into commands, settings, storage, and business logic all at once.

## Keep extension.py focused on assembly

extension.py is a Module entry point. Keep MODULE_VERSION, MODULE_DISPLAY_NAME, and MODULE_DEPENDENCIES there, then provide async setup(bot). The loader reads this metadata for the name, version, and dependency order; setup registers the Cogs with the Bot.

The basic Module is the clearest reference: extension.py imports PingCog, BotInfoCog, and HelpCog, then awaits bot.add_cog(...) for each. Treat this file as an assembly list, not as the feature implementation itself.

## One entry point, one Cog

Put each Slash Command surface in a focused Cog. PingCog, for example, only owns /ping: it receives bot in its constructor, declares the command with @app_commands.command, and replies through interaction.response.send_message. Make the first command do one thing, confirm it loads, then add storage, settings, or background work.

When a feature needs settings, follow the dm Module: register settings in setup, then pass a prepared settings object to the Cog or Service. Commands handle Discord interaction while Services handle feature logic, so changing one side does not bring down the whole Module.

## Four checks when loading fails

First, make sure the folder really sits under bot/mod/ and contains extension.py. Second, every Module named in MODULE_DEPENDENCIES must exist, remain enabled, and avoid dependency cycles. Third, setup must be async and every Cog must construct correctly. Fourth, use $mod list, $bot health, or the logs to read the error recorded by the loader.

Do not hide dependency checks or swallow exceptions just to make the Bot “start somehow.” The loader respects dependency order and records failures; let the error stop in the right place so it can be diagnosed later.
