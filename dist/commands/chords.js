"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const chordApi_1 = require("../util/chordApi");
const discord_js_1 = require("discord.js");
let memory = new Map();
class SearchChords extends discord_akairo_1.Command {
    constructor() {
        super("chords", {
            aliases: ["chords"],
            args: [
                {
                    id: "chords",
                    match: "content",
                    prompt: {
                        start: "Which chords do you wish to look up?\neg.`A, B, D, G`, or `Am G7`.",
                    },
                },
            ],
        });
    }
    exec(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const chordApi = new chordApi_1.ChordApi();
            const hasComa = args.chords.includes(",");
            const rawChordsArray = args.chords.split(hasComa ? "," : " ");
            const chordApiDtos = rawChordsArray.map((_chord) => {
                const chordArray = _chord.split("");
                let root = chordArray.shift().toUpperCase();
                if (chordArray.includes("b")) {
                    root += "b";
                    chordArray.shift();
                }
                const type = chordArray.join("").toLowerCase();
                return { chord: root, type };
            });
            // // Cache Out
            const nonCachedCordApiDtos = chordApiDtos.filter((dto) => {
                if (memory.has(dto.chord + dto.type))
                    return false;
                return true;
            });
            const cachedCordApiDtos = Array.from(memory.entries()).filter(([chordName, value]) => {
                return chordApiDtos
                    .map((e) => e.chord + e.type)
                    .includes(chordName);
            });
            // Sending Cached Chords
            const cachedChordEmbeds = cachedCordApiDtos.map(([chordName, value]) => {
                return new discord_js_1.MessageEmbed()
                    .setTitle(value[0].chord_name)
                    .setColor("GREEN")
                    .setImage(value[0].chord_diag[0])
                    .setURL(value[0].chord_url[0]);
            });
            cachedChordEmbeds.forEach((e) => message.reply(e).then((sentEmbed) => {
                sentEmbed.react("⬅️");
                sentEmbed.react("➡️");
                let iterator = 0;
                const collector = sentEmbed.createReactionCollector((r, u) => message.author.id === u.id, { time: 3e5 });
                collector.on("collect", (r, u) => {
                    r.users.remove(u);
                    const max = memory.get(e.title).length;
                    if (r.emoji.name === "⬅️") {
                        if (iterator === 0)
                            iterator = max - 1;
                        else {
                            iterator -= 1;
                        }
                    }
                    else if (r.emoji.name === "➡️") {
                        if (iterator < max - 1)
                            iterator += 1;
                        else {
                            iterator = 0;
                        }
                    }
                    console.log(memory.get(e.title)[iterator]);
                    const changedEmbed = sentEmbed.embeds[0].setImage(memory.get(e.title)[iterator].chord_diag[0]);
                    sentEmbed.edit(changedEmbed);
                });
            }));
            // Creating Embeds for non Cached Chords
            const nonCachedChordEmbeds = yield Promise.all(nonCachedCordApiDtos.map((dto) => chordApi.forChord(dto)))
                .then((promises) => {
                // Cache In
                promises.forEach((apiDto) => {
                    const inMemory = memory.has(apiDto[0].chord_name[0]);
                    if (inMemory)
                        return;
                    memory.set(apiDto[0].chord_name[0], apiDto);
                });
                // Created Embeds
                const embeds = promises.map((promise) => {
                    return new discord_js_1.MessageEmbed()
                        .setTitle(promise[0].chord_name)
                        .setColor("GREEN")
                        .setImage(promise[0].chord_diag[0])
                        .setURL(promise[0].chord_diag[0]);
                });
                return embeds;
            })
                .catch((err) => {
                const errorEmbed = new discord_js_1.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Error occured.")
                    .setDescription("Chances are, you mispelled a chord name.")
                    .addField("For more information on this, do", `${this.prefix}${this.aliases[0]} help`)
                    .setThumbnail("https://icon-library.com/images/ukulele-icon/ukulele-icon-3.jpg")
                    .setColor("RED")
                    .setFooter("Examples: Am, C, Cdim, Bsus2, Gaug");
                message.reply(errorEmbed);
                return [];
            });
            nonCachedChordEmbeds.forEach((e) => message.reply(e).then((sentEmbed) => {
                sentEmbed.react("⬅️");
                sentEmbed.react("➡️");
                let iterator = 0;
                const collector = sentEmbed.createReactionCollector((r, u) => message.author.id === u.id, { time: 3e5 });
                collector.on("collect", (r, u) => {
                    var _a;
                    r.users.remove(u);
                    const max = memory.get(e.title).length;
                    if (r.emoji.name === "⬅️") {
                        if (iterator === 0)
                            iterator = max - 1;
                        else {
                            iterator -= 1;
                        }
                    }
                    else if (r.emoji.name === "➡️") {
                        if (iterator < max - 1)
                            iterator += 1;
                        else {
                            iterator = 0;
                        }
                    }
                    console.log(memory.get(e.title)[iterator]);
                    const changedEmbed = sentEmbed.embeds[0].setImage(((_a = memory.get(e.title)[iterator]) === null || _a === void 0 ? void 0 : _a.chord_diag[0]) ||
                        "https://source.unsplash.com/random");
                    sentEmbed.edit(changedEmbed);
                });
            }));
        });
    }
}
exports.default = SearchChords;
//# sourceMappingURL=chords.js.map