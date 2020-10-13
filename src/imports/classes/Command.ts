import Discord from 'discord.js';
import { logger } from '../../utils/Utils';
import { CommandTypes, CommandConfig } from '../types/CommandTypes';

export class ParentCommand {
    readonly name: string;
    readonly description: string;
    readonly channels: string[];
    readonly uses: string[][];
    public disabled: boolean;
    private function: Function;
    public type: CommandTypes;

    public constructor(command_config: CommandConfig) {
        this.name = command_config.name.toUpperCase();
        this.description = command_config.description;
        this.channels = command_config.channels;
        this.uses = command_config.uses;
        this.function = command_config.function;
        this.disabled = command_config.disabled;
        this.type = 'NONE';
    }

    public execute(msg: Discord.Message, args: string[]) {
        const time_start: number = Date.now();
        logger.command(
            `${msg.author.username}#${msg.author.discriminator} > ${this.type} > ${this.name} > ${args.join(', ')}`
        );
        if (this.disabled) return logger.warn('Command is disabled');
        if (!this.function) return logger.error('Command is not set');
        if (this.channels.length > 0 && !this.channels.includes(msg.channel.id)) return logger.warn('Wrong channel');
        if (!this.canExecute(msg)) return logger.error(`${msg.author.username} can't execute that command`);
        this.function({ msg, args });
        logger.info(`${this.name} executed in ${Date.now() - time_start}ms`);
    }

    canExecute(msg: Discord.Message): boolean {
        return true;
    }
}

class Normal extends ParentCommand {
    public constructor(command_config: CommandConfig) {
        super(command_config);
        this.type = 'NORMAL';
    }

    canExecute(msg: Discord.Message): boolean {
        return true;
    }
}

class Admin extends ParentCommand {
    public constructor(command_config: CommandConfig) {
        super(command_config);
        this.type = 'ADMIN';
    }

    canExecute(msg: Discord.Message): boolean {
        const permissions: Discord.PermissionResolvable = ['ADMINISTRATOR'];
        if (!msg.member?.permissions.has(permissions, true)) return false;
        return true;
    }
}

class Games extends ParentCommand {
    public constructor(command_config: CommandConfig) {
        super(command_config);
        this.type = 'NORMAL';
    }

    canExecute(msg: Discord.Message): boolean {
        return true;
    }
}

export const Command = {
    Normal,
    Admin,
    Games
};
