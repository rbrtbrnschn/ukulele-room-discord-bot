import { CommandHandler, ListenerHandler } from "discord-akairo";
import { AkairoClient } from "discord-akairo";
import path from "path";
import * as nodeCron from "node-cron";
import { Message } from "discord.js";
import { guilds } from "./guilds";

import { DISCORD_BOT_TOKEN, PREFIX } from "./config";

class MyClient extends AkairoClient {
  commandHandler: CommandHandler;
  listenerHandler: ListenerHandler;
  constructor() {
    super(
      {
        // Options for Akairo go here.
      },
      {
        // Options for discord.js goes here.
        disableMentions: "everyone",
        presence: { activity: { type: "WATCHING", name: `${PREFIX}help` } },
      }
    );

    this.commandHandler = new CommandHandler(this as any, {
      directory: path.join(__dirname, "./commands/"),
      prefix: (msg: Message) => {
        const existingGuild = guilds.get(msg.guild.id);
        if (!existingGuild) return PREFIX;
        return existingGuild.prefix;
      },
    });
    this.listenerHandler = new ListenerHandler(this as any, {
      directory: path.join(__dirname, "./listeners/"),
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }
}

const client = new MyClient();
client.login(DISCORD_BOT_TOKEN);

// Suggestionbox
// const expression = true ? "0 8 * * *" : "*/10 * * * * *";
// nodeCron.schedule(expression, async () => {
//   const UkuleleRoom = client.guilds.cache.get("831083103161548820");
//   await UkuleleRoom.members.fetch();
//   const rbrtbrnschn = UkuleleRoom.members.cache.find(
//     (e) => e.user.id === "384079582267047937"
//   );
//   if (!rbrtbrnschn) return;
//   if (!suggestions.length) return;

//   console.log("Sent all suggestions to @rbrtbrnschn.");
//   rbrtbrnschn.createDM().then((dms) => {
//     suggestions.forEach((sug, index) =>
//       dms
//         .send(
//           `> Username: ${sug.username}\n> DisplayName: ${sug.displayName}\n\n${sug.content}`
//         )
//         .then((sentMessage) => {
//           suggestions.splice(index, 1);
//           if (suggestions.length === 1) suggestions.pop();
//         })
//         .catch(console.log)
//     );
//   });
// });
