import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { UkuleleMessage } from "../../../interfaces/ukuleleMessage.interface";
import { addProgression, ChordProgression } from "../../../db/progressions";
import { createProgressionEmbed } from "./util.progression";
import { MessageEmbed } from "discord.js";
import { BOT_THUMBNAIL } from "../../../config";

class AddProgression extends Command {
  constructor() {
    super("progressions-help", {
      aliases: ["progressions-help", "progression-help", "prog-help"],
    });
  }

  exec(message: UkuleleMessage) {
    const { __prefix: prefix } = message;
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Progressions - Help")
      .setDescription("Listed below are all the subcommands.")
      .setTimestamp()
      .setThumbnail(BOT_THUMBNAIL)
      .addFields([
        {
          name: `Need a random chord progresion? Done.`,
          value: `> \`${prefix}progressions\``,
        },
        {
          name: `Want to find a specific progression for a song you know?`,
          value: `> \`${prefix}progressions find\``,
        },
        {
          name: `Can't find the progression to a song? Add it yourself!`,
          value: `> \`${prefix}progressions add\``,
        },
        {
          name: `Want to see all of them? Sure.`,
          value: `> \`${prefix}progressions list\``,
        },
      ]);
    return message.reply(embed);
  }
}

export default AddProgression;
