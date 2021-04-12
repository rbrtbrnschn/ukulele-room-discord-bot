import { Message, MessageEmbed } from "discord.js";

import { Command } from "discord-akairo";
const { BOT_THUMBNAIL, PREFIX } = require("../../config.json");
class Guide extends Command {
  constructor() {
    super("guide", {
      aliases: ["help"],
    });
  }

  exec(message: Message) {
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
          name: `Search for tabs for your favourite songs - ${PREFIX}song`,
          value: `\`> ${PREFIX}song riptide\``,
        },
        {
          name: `Forgot a chord? Look it up! - ${PREFIX}chords`,
          value: `\`> ${PREFIX}chords Am G E7 Dm\``,
        },
        {
          name: `Want to learn a new tune? Easy! - ${PREFIX}progressions`,
          value: `\`${PREFIX}progressions\``,
        },
        {
          name: `Got an Idea? Leave a suggestion. - ${PREFIX}suggestion`,
          value: `\`${PREFIX}suggestion\``,
        },
      ]);

    return message.reply(embed);
  }
}

export default Guide;