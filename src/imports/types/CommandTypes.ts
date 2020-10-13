import Discord from 'discord.js';
import { ParentCommand } from '../classes/Command';

export type CommandUsage = {
    usage: string;
    description: string;
};

export type CommandParams = {
    msg: Discord.Message;
    args: string[];
};

export type CommandTypes = 'NONE' | 'NORMAL' | 'ADMIN';

export type CommandConfig = {
    name: string;
    description: string;
    channels: string[];
    uses: string[][];
    disabled: boolean;
    function: Function;
};

export type CommandConfigTypes = {
    normal: CommandConfig[];
    admin: CommandConfig[];
    games: CommandConfig[];
};

export type ClientCommands = { [keyof: string]: Discord.Collection<string, ParentCommand> };
