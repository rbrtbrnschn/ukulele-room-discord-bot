import { Message } from "discord.js";

import { Command } from "discord-akairo";

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
    });
  }

  exec(message: Message) {
    return message.reply("🎸 SMASH SMASH SMASH");
  }
}

export default PingCommand;
