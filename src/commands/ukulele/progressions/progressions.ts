import { Message } from "discord.js";

import { Command, Flag } from "discord-akairo";
import { MessageEmbed } from "discord.js";

import { BOT_THUMBNAIL } from "../../../config";
import { UkuleleMessage } from "../../../interfaces/ukuleleMessage.interface";
import { getProgressions } from "../../../db/progressions";
import { createProgressionEmbed } from "./util.progression";
class SampleProgressions extends Command {
  constructor() {
    super("progressions", {
      aliases: ["progressions", "progression", "prog"],
    });
  }

  *args(msg: UkuleleMessage) {
    const { __prefix: prefix } = msg;
    const method = yield {
      type: [
        ["progressions-add", "add"],
        ["progressions-find", "progressions-find", "find"],
        ["progressions-help", "help"],
        ["progressions-list", "list"],
      ],
      // otherwise: `Check \`${prefix}progressions-help\` for more information`,
    };
    if (!method) return;
    return Flag.continue(method);
  }

  exec(message: UkuleleMessage) {
    const { __prefix: prefix } = message;
    const progressions = getProgressions();

    const randInt = Math.floor(Math.random() * progressions.length);
    const progression = progressions[randInt];

    const embed = createProgressionEmbed(progression, prefix);
    return message.reply(embed);
  }
}

export default SampleProgressions;
