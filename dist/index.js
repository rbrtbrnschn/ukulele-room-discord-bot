"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_akairo_2 = require("discord-akairo");
const path_1 = __importDefault(require("path"));
const { DISCORD_BOT_TOKEN, PREFIX } = require("../config.json");
class MyClient extends discord_akairo_2.AkairoClient {
    constructor() {
        super({
        // Options for Akairo go here.
        }, {
            // Options for discord.js goes here.
            disableMentions: 'everyone',
            presence: { activity: { type: "LISTENING", name: `${PREFIX}help` } }
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.default.join(__dirname, './commands/'),
            prefix: PREFIX // "/"
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.default.join(__dirname, './listeners/')
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
}
const client = new MyClient();
client.login(DISCORD_BOT_TOKEN);
//# sourceMappingURL=index.js.map