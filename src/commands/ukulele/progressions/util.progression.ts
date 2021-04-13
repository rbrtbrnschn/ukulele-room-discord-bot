import { MessageEmbed } from "discord.js";
import { BOT_THUMBNAIL } from "../../../config";
import { ChordProgression } from "../../../db/progressions";

export function createProgressionEmbed(
  progression: ChordProgression,
  prefix: string | String
) {
  if (!progression) {
    const embed = new MessageEmbed()
      .setTitle("Progressions")
      .setDescription("*We could not find your progression.*")
      .addField(
        "Either check your spelling or add it yourself.",
        `> To add one, try \`${prefix}progressions-add\``
      )
      .setColor("RED")
      .setTimestamp()
      .setThumbnail(BOT_THUMBNAIL)
      .setFooter(`For more help, simply type ${prefix}progressions-help`);
    return embed;
  }

  const embed = new MessageEmbed()
    .setTitle("Progressions")
    .addField(
      progression.title || "Random",
      "> " + progression.chords.map((e) => `**${e}**`).join(" => ")
    )
    .setDescription(`*Created by ${progression.createdBy}*`)
    .setColor("GOLD")
    .setTimestamp()
    .setThumbnail(BOT_THUMBNAIL)
    .setFooter(`For more help, simply type ${prefix}progressions-help`);

  progression.tutorial
    ? embed.addField("Tutorial", progression.tutorial) &&
      embed.setURL(progression.tutorial)
    : null;

  return embed;
}
