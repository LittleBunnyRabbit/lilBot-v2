import Discord from 'discord.js';
import { logger } from '../../utils/Utils';
import { BotClient } from './BotClient';
import { CommandUsage, CommandTypes } from '../types/CommandTypes';

export class ParentCommand {
    readonly name: string;
    readonly description: string;
    readonly channels: string[] | undefined;
    readonly uses: CommandUsage[] = [];
    private command: Function | undefined;
    public disabled: boolean = false;
    public type: CommandTypes;

    public constructor(name: string, description: string, channels?: Array<string>) {
        this.name = name.toUpperCase();
        this.description = description;
        this.channels = channels;
        this.type = 'NONE';
    }

    public setCommand(command: Function): ParentCommand {
        this.command = command;
        return this;
    }

    public addUsage(usage: string, description: string): ParentCommand {
        this.uses.push({
            usage,
            description,
        });
        return this;
    }

    public disable(): ParentCommand {
        this.disabled = true;
        return this;
    }

    public execute(msg: Discord.Message, args: string[], client: BotClient) {
        const time_start: number = Date.now();
        logger.command(
            `${msg.author.username}#${msg.author.discriminator} > ${this.type} > ${this.name} > ${args.join(', ')}`
        );
        if (this.disabled) return logger.warn('Command is disabled');
        if (!this.command) return logger.error('Command is not set');
        if (this.channels && !this.channels.includes(msg.channel.id)) return logger.warn('Wrong channel');
        if (!this.canExecute(msg)) return logger.error(`${msg.author.username} can't execute that command`);
        this.command({ msg, args, client });
        logger.info(`${this.name} executed in ${Date.now() - time_start}ms`);
    }

    canExecute(msg: Discord.Message): boolean {
        return true;
    }
}

class Normal extends ParentCommand {
    public constructor(name: string, description: string, channels?: Array<string>) {
        super(name, description, channels);
        this.type = 'NORMAL';
    }

    canExecute(msg: Discord.Message): boolean {
        return true;
    }
}

class Admin extends ParentCommand {
    public constructor(name: string, description: string, channels?: Array<string>) {
        super(name, description, channels);
        this.type = 'ADMIN';
    }

    canExecute(msg: Discord.Message): boolean {
        const permissions: Discord.PermissionResolvable = ['ADMINISTRATOR'];
        if (!msg.member?.permissions.has(permissions, true)) return false;
        return true;
    }
}

export const Command = {
    Normal,
    Admin,
};
