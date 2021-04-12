import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { ChordApi } from "../util/chordApi";
import { MessageEmbed } from "discord.js";
const { PREFIX } = require("../../config.json");

let memory = new Map<String, ApiDto[]>();

interface ApiDto {
  chord_name: String[];
  chord_diff: String[];
  chord_diag: String[];
  chord_diag_mini: String[];
  chord_photo: String[];
  chord_url: String[];
}

interface Args {
  chords: String;
}
class SearchChords extends Command {
  constructor() {
    super("chords", {
      aliases: ["chords", "chord"],
      args: [
        {
          id: "chords",
          match: "content",
          prompt: {
            start:
              "Which chords do you wish to look up?\neg.`A, B, D, G`, or `Am G7`.",
          },
        },
      ],
    });
  }

  async exec(message: Message, args: Args) {
    if (args.chords.toLocaleLowerCase() === "help") {
      return message.reply(
        new MessageEmbed()
          .setTitle("Chords - Help")
          .setDescription(
            "You may search for all chords. Let me show you some examples."
          )
          .addFields(
            {
              name: "Major Chords",
              value: `> \`${PREFIX}${this.aliases[0]} A C G\``,
            },
            {
              name: "Minor Chords",
              value: `> \`${PREFIX}${this.aliases[0]} Am, Cm, Gm\``,
            },
            {
              name: "7th Chords",
              value: `> \`${PREFIX}${this.aliases[0]} G7 C7 A7\``,
            },
            {
              name: "Flats",
              value: `> \`${PREFIX}${this.aliases[0]} Bb Db Eb\``,
            },
            {
              name: "Suspended & Diminished Chords",
              value: `> \`${PREFIX}${this.aliases[0]} Bsus2 Asus2 Gsus2\``,
            },
            {
              name: "Augmented & Add Chords",
              value: `> \`${PREFIX}${this.aliases[0]} Caug Dadd9 Fadd9\``,
            },
            {
              name: "Notice: No Sharps!",
              value: `> A C# necomes a Db, and so on.`,
            }
          )
          .setTimestamp()
          .setThumbnail(
            "https://icon-library.com/images/ukulele-icon/ukulele-icon-3.jpg"
          )
          .setFooter("Sus4-chords currently do not work. Don't ask me why.")
          .setColor("GOLD")
      );
    }
    const chordApi = new ChordApi();
    const hasComa = args.chords.includes(",");

    const rawChordsArray = args.chords
      .split(/[ ,]+/)
      .join(",")
      .split(",")
      .map((e) => e.trim());
    const chordApiDtos = rawChordsArray.map((_chord) => {
      const chordArray = _chord.split("");

      let root = chordArray.shift().toUpperCase();
      if (chordArray.includes("b")) {
        root += "b";
        chordArray.shift();
      }
      const type = chordArray.join("").toLowerCase();

      return { chord: root, type };
    });

    // // Cache Out
    const nonCachedCordApiDtos = chordApiDtos.filter((dto) => {
      if (memory.has(dto.chord + dto.type)) return false;
      return true;
    });
    const cachedCordApiDtos = Array.from(memory.entries()).filter(
      ([chordName, value]) => {
        return chordApiDtos
          .map((e) => e.chord + e.type)
          .includes(chordName as string);
      }
    );

    // Sending Cached Chords
    const cachedChordEmbeds: MessageEmbed[] = cachedCordApiDtos.map(
      ([chordName, value]) => {
        return new MessageEmbed()
          .setTitle(value[0].chord_name)
          .setColor("GREEN")
          .setImage(value[0].chord_diag[0] as string)
          .setURL(value[0].chord_url[0] as string)
          .addField(
            "To see different variants of this chord",
            "> hit the ⬅️ and / or the ➡️ button below."
          )
          .setFooter(
            `Do \`${PREFIX}${this.aliases[0]} help\` for more information.`
          );
      }
    );
    cachedChordEmbeds.forEach((e) =>
      message.reply(e).then((sentEmbed) => {
        sentEmbed.react("⬅️");
        sentEmbed.react("➡️");
        let iterator = 0;
        const collector = sentEmbed.createReactionCollector(
          (r, u) => message.author.id === u.id,
          { time: 3e5 }
        );
        collector.on("collect", (r, u) => {
          r.users.remove(u);
          const max = memory.get(e.title).length;

          if (r.emoji.name === "⬅️") {
            if (iterator === 0) iterator = max - 1;
            else {
              iterator -= 1;
            }
          } else if (r.emoji.name === "➡️") {
            if (iterator < max - 1) iterator += 1;
            else {
              iterator = 0;
            }
          }
          console.log(memory.get(e.title)[iterator]);
          const changedEmbed = sentEmbed.embeds[0].setImage(
            memory.get(e.title)[iterator].chord_diag[0] as string
          );
          sentEmbed.edit(changedEmbed);
        });
      })
    );

    // Creating Embeds for non Cached Chords
    const nonCachedChordEmbeds = await Promise.all(
      nonCachedCordApiDtos.map((dto) => chordApi.forChord(dto))
    )
      .then((promises) => {
        // Cache In
        promises.forEach((apiDto) => {
          const inMemory = memory.has(apiDto[0].chord_name[0]);
          if (inMemory) return;
          memory.set(apiDto[0].chord_name[0], apiDto);
        });

        // Created Embeds
        const embeds = promises.map((promise) => {
          return new MessageEmbed()
            .setTitle(promise[0].chord_name)
            .setColor("GREEN")
            .setImage(promise[0].chord_diag[0] as string)
            .setURL(promise[0].chord_diag[0])
            .addField(
              "To see different variants of this chord",
              "> hit the ⬅️ and / or the ➡️ button below."
            )
            .setFooter(
              `Do \`${PREFIX}${this.aliases[0]} help\` for more information.`
            );
        });
        return embeds;
      })
      .catch((err) => {
        const errorEmbed = new MessageEmbed()
          .setTimestamp()
          .setTitle("Error occured.")
          .setDescription("Chances are, you mispelled a chord name.")
          .addField(
            "DISCLAIMER!",
            "sus4-chords currently do not work - no clue why"
          )
          .addField(
            "For more information on this, do",
            `> \`${PREFIX}${this.aliases[0]} help\``
          )
          .addField(
            "Maybe take a look at this guide showing the proper usage.",
            "> https://ukulele-chords.com/api"
          )
          .setThumbnail(
            "https://icon-library.com/images/ukulele-icon/ukulele-icon-3.jpg"
          )
          .setColor("RED")
          .setFooter("Examples: Am, C, Cdim, Bsus2, Gaug");
        message.reply(errorEmbed);
        return [];
      });

    nonCachedChordEmbeds.forEach((e) =>
      message.reply(e).then((sentEmbed) => {
        sentEmbed.react("⬅️");
        sentEmbed.react("➡️");
        let iterator = 0;
        const collector = sentEmbed.createReactionCollector(
          (r, u) => message.author.id === u.id,
          { time: 3e5 }
        );
        collector.on("collect", (r, u) => {
          r.users.remove(u);
          const max = memory.get(e.title).length;

          if (r.emoji.name === "⬅️") {
            if (iterator === 0) iterator = max - 1;
            else {
              iterator -= 1;
            }
          } else if (r.emoji.name === "➡️") {
            if (iterator < max - 1) iterator += 1;
            else {
              iterator = 0;
            }
          }
          console.log(memory.get(e.title)[iterator]);
          const changedEmbed = sentEmbed.embeds[0].setImage(
            (memory.get(e.title)[iterator]?.chord_diag[0] as string) ||
              "https://source.unsplash.com/random"
          );
          sentEmbed.edit(changedEmbed);
        });
      })
    );
  }
}

export default SearchChords;
// test s
