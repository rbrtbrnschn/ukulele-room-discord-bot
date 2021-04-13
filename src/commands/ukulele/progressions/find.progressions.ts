import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { getProgression, getProgressions } from "../../../db/progressions";
import { createProgressionEmbed } from "./util.progression";
import { UkuleleMessage } from "../../../interfaces/ukuleleMessage.interface";

class FindProgression extends Command {
  constructor() {
    super("progressions-find", {
      aliases: ["progressions-find", "prog-find"],
      args: [
        {
          id: "title",
          match: "content",
          prompt: {
            start: "> Please provide the songname.",
          },
        },
      ],
    });
  }

  exec(message: UkuleleMessage, args: { title: String }) {
    const progression = getProgression(args.title as string);
    const embed = createProgressionEmbed(progression, message.__prefix);
    return message.reply(embed);
  }
}

export default FindProgression;
