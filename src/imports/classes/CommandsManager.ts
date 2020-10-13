import Discord from 'discord.js';
import { ParentCommand } from './Command';
import { getCommands } from '../../bot/botConfig';
import { BotClient } from './BotClient';
import { logger } from '../../utils/Utils';

export class CommandsManager {
    private client: BotClient;
    private commands: Discord.Collection<string, ParentCommand>;

    public constructor(client: BotClient) {
        this.client = client;
        this.commands = new Discord.Collection(getCommands().map((command: ParentCommand) => {
            logger.system(`Command added: ${command.name}`);
            return [ command.name, command ];
        }));
    }

    public executeCommand(msg: Discord.Message) {
        if (!msg.content.startsWith(this.client.prefix)) return;
        const args: Array<string> = msg.content.slice(this.client.prefix.length).split(/ +/);
        const command_name = args.shift()?.toUpperCase();
        if(!command_name) return;
        if (!this.commands.has(command_name)) return;
        const command = this.commands.get(command_name);
        if(!command) return;
        try {
            return command.execute(msg, args, this.client);
        } catch (error) {
            return logger.error(`Failed to execute the command:\n${error}`);
        }
    }

    public getCommands(): Discord.Collection<string, ParentCommand> {
        return this.commands;
    }

    public getCommand(command_name: string): ParentCommand | undefined {
        return this.commands.find((command: ParentCommand) => command.name == command_name);
    }
}
