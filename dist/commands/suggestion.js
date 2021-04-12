"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const suggestions_1 = require("../suggestions");
class Suggestion extends discord_akairo_1.Command {
    constructor() {
        super("suggestion", {
            aliases: ["suggestion", "suggest"],
            args: [
                {
                    id: "suggestion",
                    match: "content",
                    prompt: {
                        start: "> Provide your suggestion below, or cancel any time by writing `cancel`",
                        time: 3e5,
                        timeout: "> Whoops, you timed out. You only have 5 minutes, remember that.",
                    },
                },
            ],
        });
    }
    exec(message, args) {
        var _a;
        if (!args.suggestion)
            return;
        suggestions_1.suggestions.push({
            content: args.suggestion,
            username: message.author.username,
            displayName: ((_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName) || "null",
        });
        return message.reply("> Thanks for leaving your suggesstion. Have a great day!");
    }
}
exports.default = Suggestion;
//# sourceMappingURL=suggestion.js.map