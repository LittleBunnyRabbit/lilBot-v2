import Discord from 'discord.js';
import { ParentCommand } from '../classes/Command';

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