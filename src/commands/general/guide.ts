import { Message, MessageEmbed } from "discord.js";

import { Command } from "discord-akairo";
import { BOT_THUMBNAIL, PREFIX } from "../../config";
import { guilds } from "../../guilds";
import { UkuleleMessage } from "../../interfaces/ukuleleMessage.interface";
class Guide extends Command {
  constructor() {
    super("guide", {
      aliases: ["help"],
    });
  }

  exec(message: UkuleleMessage) {
    const { __prefix: prefix } = message;
    const embed = new MessageEmbed()
      .setTitle("Help - Spotlight")
      .setDescription(
        "Listed below are all currently supported features.\n*For further information on each command, simply run it.*"
      )
      .setFooter(
        "For suggestions, feel free to contact your dev team or a Moderator."
      )
      .setThumbnail(BOT_THUMBNAIL)
      .setTimestamp()
      .setColor("GOLD")
      .addFields([
        {
          name: `Search for tabs for your favourite songs - ${prefix}song`,
          value: `\`${prefix}song riptide\``,
        },
        {
          name: `Forgot a chord? Look it up! - ${prefix}chords`,
          value: `\`${prefix}chords Am G E7 Dm\``,
        },
        {
          name: `Want to learn a new tune? Easy! - ${prefix}progressions`,
          value: `\`${prefix}progressions\``,
        },
        {
          name: `Got an Idea? Leave a suggestion. - ${prefix}suggestion`,
          value: `\`${prefix}suggestion\``,
        },
      ]);

    return message.reply(embed);
  }
}

export default Guide;
