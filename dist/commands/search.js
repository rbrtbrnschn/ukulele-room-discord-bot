"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class SearchCommand extends discord_akairo_1.Command {
    constructor() {
        super("search", {
            aliases: ["search"],
            args: [
                {
                    id: "title",
                    type: "lower",
                    prompt: {
                        start: "What's the song name?",
                    },
                },
                {
                    id: "artist",
                    type: "lower",
                    default: "",
                    prompt: {
                        start: "Artist name?",
                    },
                },
            ],
        });
    }
    exec(message, args) {
        return message.reply(`Searching for ${args.title}`);
    }
}
exports.default = SearchCommand;
//# sourceMappingURL=search.js.map