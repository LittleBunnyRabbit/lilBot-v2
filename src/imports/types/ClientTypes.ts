import Discord from 'discord.js';
import { ParentCommand } from '../classes/Command';

export type CustomClient = Discord.Client & {
    prefix?: string,
    commands?: Discord.Collection<string, ParentCommand>
};
