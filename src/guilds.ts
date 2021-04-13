import { TextChannel } from "discord.js";

export interface UkuleleGuild {
  id: string;
  prefix: string;
  suggestionChannel?: TextChannel;
}
export const guilds = new Map<string, UkuleleGuild>();
