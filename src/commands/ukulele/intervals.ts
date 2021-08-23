import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { BOT_THUMBNAIL } from "../../config";

class ScalesCommand extends Command {
  constructor() {
    super("intervals", {
      aliases: ["intervals"],
    });
  }

  exec(message: Message) {
    const video = "https://www.youtube.com/watch?v=fab90AjfYzc&t=617s";
    const image = "https://i.imgur.com/6J7gkkR.jpeg";
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setImage(image)
      .setTitle("Intervals")
      .setDescription(
        `Watch this [video](${video}). This should explain everything for now :p.`
      )
      .setURL(video);

    message.reply(embed);
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

export default ScalesCommand;
