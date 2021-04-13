import { Listener } from "discord-akairo";
import { TextChannel } from "discord.js";
import { PREFIX } from "../config";
import { guilds, UkuleleGuild } from "../guilds";
import { UkuleleMessage } from "../interfaces/ukuleleMessage.interface";

class ReadyListener extends Listener {
  constructor() {
    super("message", {
      emitter: "client",
      event: "message",
    });
  }

  exec(message: UkuleleMessage) {
    if (message.author.bot) return;

    // Adding UkuleleGuild & Prefix
    const { id } = message.guild;
    const guild = guilds.get(id);
    const newGuild: UkuleleGuild = { id, prefix: PREFIX };
    if (!guild) guilds.set(id, newGuild);
    message.__guild = guild ?? newGuild;
    message.__prefix = (guild ?? newGuild).prefix;
  }
}

module.exports = ReadyListener;
