import { Message, TextChannel } from "discord.js";

import { Command } from "discord-akairo";

import { UkuleleMessage } from "../../interfaces/ukuleleMessage.interface";

class Suggestion extends Command {
  constructor() {
    super("suggestions-channel", {
      aliases: ["suggestions-channel", "suggestion-channel"],
      args: [
        {
          id: "channel",
          type: "channel",
          prompt: {
            start:
              "> Please mention the channel for the suggestions, or cancel any time by writing `cancel`",
            retry: "> Oops that wasn't a valid channel try again.",
            timeout:
              "> Whoops, you timed out. You only have 30 seconds, remember that.",
          },
        },
      ],
    });
  }

  exec(message: UkuleleMessage, args: { channel: TextChannel }) {
    message.__guild.suggestionChannel = args.channel;
    return message.reply(`Set suggestion channel to <#${args.channel.id}>`);
  }
}

export default Suggestion;
