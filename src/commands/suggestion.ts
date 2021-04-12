import { Message } from "discord.js";

import { Command } from "discord-akairo";
import { suggestions } from "../suggestions";
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

  exec(message: Message, args: { suggestion: String }) {
    if (!args.suggestion) return;
    suggestions.push({
      content: args.suggestion,
      username: message.author.username,
      displayName: message.member?.displayName || "null",
    });
    return message.reply(
      "> Thanks for leaving your suggesstion. Have a great day!"
    );
  }
}

export default Suggestion;
