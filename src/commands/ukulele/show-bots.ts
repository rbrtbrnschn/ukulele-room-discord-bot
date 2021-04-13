import { Message } from "discord.js";

import { Command } from "discord-akairo";

class PingCommand extends Command {
  constructor() {
    super("show-bots", {
      aliases: ["show-bots"],
    });
  }

  exec(message: Message) {
    return message.reply("🎸 showing bots");
  }
}

export default PingCommand;
