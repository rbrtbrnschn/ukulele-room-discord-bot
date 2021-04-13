import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { UkuleleMessage } from "../../../interfaces/ukuleleMessage.interface";
import { addProgression, ChordProgression } from "../../../db/progressions";
import { createProgressionEmbed } from "./util.progression";

class AddProgression extends Command {
  constructor() {
    super("progressions-add", {
      aliases: ["progressions-add", "prog-add"],
      args: [
        {
          id: "title",
          match: "content",
          prompt: {
            start: "> Please provide the songname (and artist).",
          },
        },
        {
          id: "progression",
          match: "content",
          prompt: {
            start: "> Please provide the chord progression like so: `C Em D7`.",
          },
        },
        {
          id: "tutorial",
          match: "content",
          prompt: {
            start:
              "*OPTIONAL*\n> Please provide a link to the turorial.\n> If you do not have one, please write `none`",
          },
        },
      ],
    });
  }

  exec(
    message: UkuleleMessage,
    args: { title: string; progression: string; tutorial?: string }
  ) {
    let { title, progression, tutorial } = args;
    const progressionArray = progression
      .split(/[ ,]+/)
      .join(",")
      .split(",")
      .map((e) => e.trim());

    const chordProgression: ChordProgression = {
      title: title,
      chords: progressionArray,
      createdBy: message.author.username,
    };
    tutorial.toLowerCase() !== "none" && (chordProgression.tutorial = tutorial);
    addProgression(chordProgression);

    const embed = createProgressionEmbed(chordProgression, message.__prefix);
    return message.reply(embed);
  }
}

export default AddProgression;
