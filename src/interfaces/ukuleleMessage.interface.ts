import { TextChannel } from "discord.js";
import { Message } from "discord.js";
import { UkuleleGuild } from "../guilds";

export interface UkuleleMessage extends Message {
  __prefix: string;
  __suggestionChannel?: TextChannel;
  __guild: UkuleleGuild;
}
