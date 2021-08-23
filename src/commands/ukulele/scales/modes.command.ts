import { Message } from "discord.js";
import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { BOT_THUMBNAIL } from "../../../config";
import { Modes, Scales } from "./scales";
import { UkuleleMessage } from "../../../interfaces/ukuleleMessage.interface";

class ModesCommand extends Command {
  constructor() {
    super("Modes", {
      aliases: ["modes", "mode"],
    });
  }

  exec(message: UkuleleMessage) {
    const { __prefix: prefix } = message;
    const scales = Modes.map((s) => ({
      name: s.name,
      value: `\`${s.formula}\` (${s.example})`,
    }));
    const helperText = {
      name: `Don't know what "1 2 b3 5..." means?`,
      value: `Do \`${prefix}intervals\` to read more.`,
    };

    const fields = [
      {
        name: "Name ",
        value: "Formula ( Example in C )",
      },
      helperText,
      ...scales,
    ];
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setThumbnail(BOT_THUMBNAIL)
      .addFields(fields)
      .setTitle("Modes");
    return message.reply(embed);
  }
}

function handle_no_args(message: Message) {
  const no_args_message = new MessageEmbed()
    .setColor("RED")
    .setThumbnail(BOT_THUMBNAIL)
    .setTitle("Wrong")
    .setTimestamp();
  return message.reply(no_args_message);
}

export default ModesCommand;
