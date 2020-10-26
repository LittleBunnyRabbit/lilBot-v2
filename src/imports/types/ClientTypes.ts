import { Client, Collection } from 'discord.js';
import { Command } from '../classes/Command';

export type CustomClient = Client & {
    prefix?: string,
    commands?: Collection<string, Command>
};
