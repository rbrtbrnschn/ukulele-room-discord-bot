# Ukulele Room Discord Bot

Installing Dependencies:

1. install node-js(https://nodejs.org/en/)

Installation:

1. download folder
2. go into folder
3. rename src/SAMPLECONFIG.ts to src/config.ts
4. setup the config.ts file properly (further instructions follow)
5. run install.bat (should close after a few seconds to a minute)
6. run launch.bat && and keep open

## Setting up the config.json

Once you have renamed the src/SAMPLECONFIG.ts, follow along.

The finished product should look similar to this

```ts
export const DISCORD_BOT_TOKEN =
  "ODMxMDc1OTE3NDAxeDO6mKY6.781237.RoRnbb2v2HqT6ZrbrJvJp-jukw8";
export const DISCORD_CLIENT_ID = "123877981237231777";
export const PREFIX = ">";
export const UKULELE_CHORDS_API_KEY = "86a9106ae65537651a8asdasdasdasda";
export const BOT_THUMBNAIL =
  "https://icon-library.com/images/ukulele-icon/ukulele-icon-3.jpg";
```

To get your `DISCORD_BOT_TOKEN` follow this [guide](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/)

To get the `DISCORD_CLIENT_ID`, you also need to visit [discord-dev-portal](https://discord.com/developers)

Set the prefix to your liking, I do not encourage using "/". You will see for yourself :D

To get your `UKULELE_CHORDS_API_KEY` go to [this site](https://ukulele-chords.com/api) and click **Get your API KEY**.

If you want to use another `BOT_THUMBNAIL`, go ahead and change it.
