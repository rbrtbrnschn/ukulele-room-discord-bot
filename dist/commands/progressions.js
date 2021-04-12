"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const { PREFIX, BOT_THUMBNAIL } = require("../../config.json");
class SampleProgressions extends discord_akairo_1.Command {
    constructor() {
        super("progressions", {
            aliases: ["progressions", "prog"],
        });
    }
    exec(message) {
        const progressions = [
            {
                title: null,
                chords: ["Dm", "Gm", "A", "F", "Bb", "E7", "A"],
            },
            {
                title: "La Bamba",
                chords: ["C", "F", "G7"],
                tutorial: "https://www.youtube.com/watch?v=jR7FAlyJvJc",
            },
            { title: null, chords: ["C", "G", "A", "F"] },
            {
                title: "Sweet Home Alabama",
                chords: ["D", "C", "G"],
                tutorial: "https://www.youtube.com/watch?v=54N9kFavhy4",
            },
            {
                title: "Hit the road jack",
                chords: ["A", "G", "F", "E7"],
                tutorial: "https://www.youtube.com/watch?v=59ctVjOHa5k",
            },
            { title: null, chords: ["C", "A7", "D7", "G", "C"] },
        ];
        const randInt = Math.floor(Math.random() * progressions.length);
        const progression = progressions[randInt];
        const embed = new discord_js_1.MessageEmbed()
            .setTitle("Progressions")
            .addField(progression.title || "Random", "> " + progression.chords.map((e) => `**${e}**`).join(" => "))
            .setColor("GOLD")
            .setTimestamp()
            .setThumbnail(BOT_THUMBNAIL)
            .setFooter(`For a new one, simply type ${PREFIX}${this.aliases[0]}`);
        progression.tutorial
            ? embed.addField("Tutorial", progression.tutorial) &&
                embed.setURL(progression.tutorial)
            : null;
        return message.reply(embed);
    }
}
exports.default = SampleProgressions;
//# sourceMappingURL=progressions.js.map