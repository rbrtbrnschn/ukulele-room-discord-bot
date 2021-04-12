"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_akairo_2 = require("discord-akairo");
const path_1 = __importDefault(require("path"));
const nodeCron = __importStar(require("node-cron"));
const suggestions_1 = require("./suggestions");
const { DISCORD_BOT_TOKEN, PREFIX } = require("../config.json");
class MyClient extends discord_akairo_2.AkairoClient {
    constructor() {
        super({
        // Options for Akairo go here.
        }, {
            // Options for discord.js goes here.
            disableMentions: "everyone",
            presence: { activity: { type: "LISTENING", name: `${PREFIX}help` } },
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.default.join(__dirname, "./commands/"),
            prefix: PREFIX, // "/"
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.default.join(__dirname, "./listeners/"),
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
}
const client = new MyClient();
client.login(DISCORD_BOT_TOKEN);
// Suggestionbox
const expression = true ? "0 8 * * *" : "*/10 * * * * *";
nodeCron.schedule(expression, () => __awaiter(void 0, void 0, void 0, function* () {
    const UkuleleRoom = client.guilds.cache.get("831083103161548820");
    yield UkuleleRoom.members.fetch();
    const rbrtbrnschn = UkuleleRoom.members.cache.find((e) => e.user.id === "384079582267047937");
    if (!rbrtbrnschn)
        return;
    if (!suggestions_1.suggestions.length)
        return;
    console.log("Sent all suggestions to @rbrtbrnschn.");
    rbrtbrnschn.createDM().then((dms) => {
        suggestions_1.suggestions.forEach((sug, index) => dms
            .send(`> Username: ${sug.username}\n> DisplayName: ${sug.displayName}\n\n${sug.content}`)
            .then((sentMessage) => {
            suggestions_1.suggestions.splice(index, 1);
            if (suggestions_1.suggestions.length === 1)
                suggestions_1.suggestions.pop();
        })
            .catch(console.log));
    });
}));
//# sourceMappingURL=index.js.map