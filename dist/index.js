"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_akairo_2 = require("discord-akairo");
const path_1 = __importDefault(require("path"));
const guilds_1 = require("./guilds");
const config_1 = require("./config");
class MyClient extends discord_akairo_2.AkairoClient {
    constructor() {
        super({
        // Options for Akairo go here.
        }, {
            // Options for discord.js goes here.
            disableMentions: "everyone",
            presence: { activity: { type: "WATCHING", name: `${config_1.PREFIX}help` } },
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.default.join(__dirname, "./commands/"),
            prefix: (msg) => {
                const existingGuild = guilds_1.guilds.get(msg.guild.id);
                if (!existingGuild)
                    return config_1.PREFIX;
                return existingGuild.prefix;
            },
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
client.login(config_1.DISCORD_BOT_TOKEN);
// Suggestionbox
// const expression = true ? "0 8 * * *" : "*/10 * * * * *";
// nodeCron.schedule(expression, async () => {
//   const UkuleleRoom = client.guilds.cache.get("831083103161548820");
//   await UkuleleRoom.members.fetch();
//   const rbrtbrnschn = UkuleleRoom.members.cache.find(
//     (e) => e.user.id === "384079582267047937"
//   );
//   if (!rbrtbrnschn) return;
//   if (!suggestions.length) return;
//   console.log("Sent all suggestions to @rbrtbrnschn.");
//   rbrtbrnschn.createDM().then((dms) => {
//     suggestions.forEach((sug, index) =>
//       dms
//         .send(
//           `> Username: ${sug.username}\n> DisplayName: ${sug.displayName}\n\n${sug.content}`
//         )
//         .then((sentMessage) => {
//           suggestions.splice(index, 1);
//           if (suggestions.length === 1) suggestions.pop();
//         })
//         .catch(console.log)
//     );
//   });
// });
//# sourceMappingURL=index.js.map