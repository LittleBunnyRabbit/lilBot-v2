import Discord from 'discord.js';
import { Command, ParentCommand } from '../../imports/classes/Command';
import { HelpEmbed, SpecificHelpEmbed } from '../../imports/embeds/Embeds';
import { BotClient } from '../../imports/classes/BotClient';
import { CommandParams, CommandUsage } from '../../imports/types/CommandTypes';

export default new Command.Normal('Help', 'Help Command')
    .setCommand(Help)
    .addUsage('help', 'list of commands')
    .addUsage('help <command name>', 'command details');

function Help({ msg, args, client }: CommandParams): any {
    const command_name: string | undefined = args?.shift()?.toUpperCase();
    if (command_name) return msg.channel.send(listOne(client, command_name));
    return msg.channel.send(listAll(client));
}

function listAll(client: BotClient) {
    const commands: Discord.Collection<string, ParentCommand> = client.commands_manager.getCommands();
    const filtered_commands: any = {};
    commands.forEach((command: ParentCommand) => {
        if(!filtered_commands[command.type]) filtered_commands[command.type] = [];
        filtered_commands[command.type].push(formatCommand(command));
    });

    const fields = [];
    for(const commands_type in filtered_commands) {
        fields.push({
            name: `${capitalize(commands_type)}:`,
            value: `**${filtered_commands[commands_type].join(", ")}**`
        });
    }
    
    return HelpEmbed(fields);

    function formatCommand(command: ParentCommand) {
        if (command.disabled) return `~~${command.name}~~`;
        return command.name;
    }

    function capitalize(value: string): string {
        value = value.toLowerCase();
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}

function listOne(client: BotClient, command_name: string) {
    const command: ParentCommand | undefined = client.commands_manager.getCommand(command_name);
    if (!command) return;
    const command_uses: string =
        command.uses.length > 0
            ? command.uses
                  .map(
                      (command_usage: CommandUsage) =>
                          `**${client?.prefix}${command_usage.usage}:** ${command_usage.description}`
                  )
                  .join('\n')
            : 'Unknown';

    return SpecificHelpEmbed(getCommandName(), command.description, command_uses, command.type);

    function getCommandName(): string {
        if (command?.disabled) return `${command?.name} (DISABLED)`;
        return `${command?.name}`;
    }
}
