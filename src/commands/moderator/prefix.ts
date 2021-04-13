import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { guilds } from "../../guilds";
import { PREFIX, BOT_THUMBNAIL } from "../../config";

const { Command } = require("discord-akairo");

class PrefixCommand extends Command {
  constructor() {
    super("prefix", {
      aliases: ["prefix"],
      category: "moderator",
      ownerOnly: true,
      args: [
        {
          id: "prefix",
        },
      ],
      channel: "guild",
    });
  }

  async exec(message: Message, args: { prefix: String }) {
    const { prefix } = args;
    const { id } = message.guild;
    let guild = guilds.get(id);
    const newGuild = { id, prefix: PREFIX };

    if (!guild) guilds.set(id, newGuild);
    guild = guilds.get(id);

    if (!prefix) {
      // send message
      const embed = new MessageEmbed()
        .setTitle("Moderator - Prefix")
        .setColor("BLURPLE")
        .setDescription("You can view your prefix and change it.")
        .setTimestamp()
        .addFields([
          {
            name: "View your prefix",
            value: `> ${guild.prefix}prefix`,
          },
          {
            name: "Changing your prefix",
            value: `> ${guild.prefix}prefix \`<newPrefix>\``,
          },
        ])
        // .setFooter("")
        .setThumbnail(BOT_THUMBNAIL);
      message.reply(embed);
    } else {
      // Set prefix
      guild.prefix = <string>prefix;
      message.client.user.setPresence({
        activity: { name: prefix + "help", type: "WATCHING" },
      });
      // guilds.set(id, newGuild);

      // send message
      return message.reply(
        `>Prefix changed from ${guild.prefix || PREFIX} to ${args.prefix}`
      );
    }
  }
}

module.exports = PrefixCommand;
