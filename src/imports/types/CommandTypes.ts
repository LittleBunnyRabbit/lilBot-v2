import Discord from 'discord.js';
import { BotClient } from "../classes/BotClient";

export type CommandUsage = {
    usage: string;
    description: string;
};

export type CommandParams = {
    msg: Discord.Message;
    args: string[];
    client: BotClient;
};

export type CommandTypes = "NONE" | "NORMAL" | "ADMIN";