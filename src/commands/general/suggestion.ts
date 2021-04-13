import { Message } from "discord.js";

import { Command, Flag } from "discord-akairo";
import { UkuleleMessage } from "../../interfaces/ukuleleMessage.interface";
import { MessageEmbed } from "discord.js";
import { BOT_THUMBNAIL } from "../../config";
class Suggestion extends Command {
  constructor() {
    super("suggestion", {
      aliases: ["suggestion", "suggest"],
      args: [
        {
          id: "suggestion",
          match: "content",
          prompt: {
            start:
              "> Provide your suggestion below, or cancel any time by writing `cancel`",
            time: 3e5,
            timeout:
              "> Whoops, you timed out. You only have 5 minutes, remember that.",
          },
        },
      ],
    });
  }

  *args(msg: UkuleleMessage) {
    const method = yield {
      type: [["suggestions-channel", "suggestion-channel"]],
    };
    if (!method) return;
    return Flag.continue(method);
  }

  exec(message: UkuleleMessage, args: { suggestion: String }) {
    if (!args.suggestion) return;
    const suggestion = {
      content: args.suggestion,
      username: message.author.username,
      displayName: message.member?.displayName || "null",
    };

    if (message.__guild?.suggestionChannel) {
      const embed = new MessageEmbed()
        .setTitle("Suggestion by @" + suggestion.username)
        .setDescription(suggestion.content)
        .setColor("GREEN")
        .setTimestamp()
        .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
        .setFooter("Displayname - " + suggestion.displayName);

      return message.__guild?.suggestionChannel
        .send(embed)
        .then((sentMessage) => {
          message.react("🇹");
          message.react("🇭");
          message.react("🇦");
          message.react("🇳");
          message.react("🇰");
          message.react("🇸");
        });
    }
    return message.guild.owner.createDM().then((dms) => {
      const embed = new MessageEmbed()
        .setTitle("Oops - Incomplete Setup")
        .setDescription(
          "*Sorry to bother you, it seems you have not yet setup the suggestionChannel for this bot.*"
        )
        .setColor("DARK_RED")
        .setTimestamp()
        .setThumbnail(BOT_THUMBNAIL)
        .addField(
          "To set up the suggestionChannel do",
          `> \` ${message.__prefix}suggestion-channel #channel-mention\``
        )
        .addField(
          "Remember:",
          "The bot needs to have access to send messages to that channel."
        )
        .setFooter(
          "This only works within the discord server, not here in the dms!"
        );
      dms.send(embed).then((sentMessage) => {
        const embed = new MessageEmbed()
          .setThumbnail(BOT_THUMBNAIL)
          .setTitle("Incomplete Setup")
          .setDescription(
            "*We are sorry to tell you, the mods haven't properly setup this bot.*"
          )
          .addField(
            "They have now been informed:",
            "> this means, your suggestion was not yet submitted."
          )
          .addField(
            "Feel free to message the moderators directly",
            "> or simply try again tomorrow."
          )
          .setColor("DARK_RED")
          .setFooter("Sorry for the inconvenience.")
          .setTimestamp();
        message.reply(embed);
      });
    });
  }
}

export default Suggestion;
