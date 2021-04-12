import { Message } from "discord.js";
import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";

import { UketabsScraper } from "../util/UketabsWebScraper";
import { User } from "discord.js";
import { MessageReaction } from "discord.js";

interface Args {
  title: "title";
  // artist: "artist";
}
class SongCommand extends Command {
  constructor() {
    super("search for song", {
      aliases: ["song"],
      args: [
        {
          id: "title",
          type: "lower",
          match: "content",
          prompt: {
            start: "What's the song name?",
          },
        },
        // {
        //   id: "artist",
        //   type: "lower",
        //   default: "",
        //   prompt: {
        //     start: "Artist name?",
        //   },
        // },
      ],
    });
  }

  async exec(message: Message, args: Args) {
    const uketabs = new UketabsScraper();
    const base = "https://ukutabs.com/?s=";
    const parsedArgs = args.title.split(" ").join("+");
    const url = base + parsedArgs;

    const songsDto = await uketabs.scrapeSong(url);

    if (!songsDto)
      return message.reply(
        "Something went terribly wrong, please contact @rbrtbrnschn#0303"
      );
    if (!songsDto.length) return message.reply(noSongsFound(args.title));

    const firstSong = songsDto[0];
    [firstSong].forEach(async (song) => {
      const embed = new MessageEmbed()
        .setTitle(song.title + " - " + song.artist)
        .setThumbnail(song.image as string)
        .setURL(song.href as string)
        .setTimestamp()
        .setDescription("React to this message to get the chords/lyrics!")
        .setColor("GOLD");

      songsDto.shift();
      const secondThreeSongs = songsDto.slice(0, 3);
      const similarSongNames = secondThreeSongs.map(
        (similarSong) => similarSong.title + " - " + similarSong.artist
      );
      if (similarSongNames.length) {
        embed.addField("Similar Songs", `> ${similarSongNames.join("\n> ")}`);
      }

      message.reply(embed).then((sentMessage) => {
        sentMessage.react("🎼");
        sentMessage.react("📃");
        let chordsAllowed = true;
        let lyricsAllowed = true;
        let active = true;

        const reactionCollecotr = sentMessage.createReactionCollector(
          (r, u: User) => !u.bot && ["🎼", "📃"].includes(r.emoji.name),
          { time: 3e5 }
        );
        reactionCollecotr.on("collect", async (r: MessageReaction, u: User) => {
          r.users.remove(u); // only works in guild channel
          // r.users.remove(sentMessage.author); // remove own reaction
          if (r.emoji.name === "🎼" && chordsAllowed) {
            const chordsDto = await uketabs.scrapeChords(song.href);
            const changedEmbed = embed.addField(
              "Chords:",
              `> ${chordsDto.map((e) => e.chord).join(", ")}`
            );
            chordsAllowed = false;
            return sentMessage.edit(changedEmbed);
          } else if (r.emoji.name === "📃" && lyricsAllowed) {
            const lyrics = await uketabs.scrapeLyrics(song.href);
            const changedEmbed = new MessageEmbed(embed)
              .addField("Lyrics:", `> ${lyrics.slice(0, 750)}`)
              .addField("To read on, please click the link below.", song.href);

            lyricsAllowed = false;
            return sentMessage.edit(changedEmbed).catch((err) => {
              embed.addField(
                "The lyrics are too large. To view them click the link below:",
                song.href
              );
              return sentMessage.edit(embed);
            });
          } else {
            if (!active) return;
            const changedMessage = new MessageEmbed(sentMessage.embeds[0])
              .setFooter("This message has been disabled.")
              .setColor("RED");
            active = false;
            sentMessage.edit(changedMessage).catch();
          }
        });
      });
    });
  }
}

export default SongCommand;

function noSongsFound(searchQuery) {
  return new MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .setTitle("No songs found.")
    .setDescription(`You may want to *check your spelling*.`)
    .addField(
      `If that's not the problem,`,
      `> We may not have \`${searchQuery}\` in our database.`
    )
    .addField("You may try looking manually over at:", "https://uketabs.com")
    .setThumbnail(
      "https://icon-library.com/images/ukulele-icon/ukulele-icon-3.jpg"
    );
}

function somethingWentTerriblyWrong() {
  return new MessageEmbed()
    .setColor("DARK_RED")
    .setTimestamp()
    .setTitle("Something went terribly wrong.")
    .setDescription("Please contact `rbrtbrnschn`.")
    .addField("> You may try:", "**1.**")
    .addField("> Restarting the bot", "**2.**")
    .addField("> Checking your spelling", "**3.**")
    .addField("> Monitor bot usage.", "\u200b")
    .setThumbnail(
      "https://icon-library.com/images/ukulele-icon/ukulele-icon-3.jpg"
    )
    .setFooter("This issue may arise to overuse of this bot.");
}
