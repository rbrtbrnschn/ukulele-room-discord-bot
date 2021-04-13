import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { UkuleleMessage } from "../../../interfaces/ukuleleMessage.interface";
import {
  addProgression,
  ChordProgression,
  getProgression,
  getProgressions,
} from "../../../db/progressions";
import { createProgressionEmbed } from "./util.progression";
import { MessageEmbed } from "discord.js";
import { BOT_THUMBNAIL } from "../../../config";

class ListProgressions extends Command {
  constructor() {
    super("progressions-list", {
      aliases: ["progressions-list", "progression-list", "prog-list"],
    });
  }

  exec(message: UkuleleMessage) {
    const { __prefix: prefix } = message;
    let page = 0;
    const max = Math.ceil(getProgressions().length / 10);

    const baseEmbed = new MessageEmbed()
      .setColor("GOLD")
      .setTitle("Progressions - Page 1")
      .setTimestamp()
      .setThumbnail(BOT_THUMBNAIL)
      .setFooter(
        "To toggle through the pages, be sure to react to this message below."
      );

    const page1Embed = new MessageEmbed(baseEmbed);
    const fields = getProgressionsPage(page).map((prog) => ({
      name: `${prog.title || "Random"}`,
      value: `> ${prog.chords.join(" => ")}`,
    }));
    page1Embed.addFields(fields);

    return message.reply(page1Embed).then((sentMessage) => {
      const collector = sentMessage.createReactionCollector(
        (r, u) =>
          u.id === message.author.id && ["⬅️", "➡️"].includes(r.emoji.name),
        { time: 3e5 }
      );
      sentMessage.react("⬅️");
      sentMessage.react("➡️");
      collector.on("collect", (r, u) => {
        r.users.remove(u);
        if (r.emoji.name === "➡️") {
          page += 1;
          if (page > max - 1) page = 0;
        } else if (r.emoji.name === "⬅️") {
          page -= 1;
          if (page < 0) page = max - 1;
        }
        const newPageEmbed = new MessageEmbed(baseEmbed);
        const fields = getProgressionsPage(page).map((prog) => ({
          name: `${prog.title || "Random"}`,
          value: `> ${prog.chords.join(" => ")}`,
        }));
        newPageEmbed.setTitle("Progressions - Page " + (page + 1));
        newPageEmbed.addFields(fields);
        sentMessage.edit(newPageEmbed);
      });
    });
  }
}

export default ListProgressions;

function getProgressionsPage(page: number) {
  const progressions = getProgressions();
  const visibleProgressions = [...progressions].slice(
    page * 10,
    page * 10 + 10
  );
  return visibleProgressions;
}
