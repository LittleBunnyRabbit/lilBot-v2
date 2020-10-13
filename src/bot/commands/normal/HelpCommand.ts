import { ParentCommand } from '../../../imports/classes/Command';
import { HelpEmbed, SpecificHelpEmbed } from '../../../embeds/Embeds';
import { CommandParams } from '../../../imports/types/CommandTypes';
import { CustomClient } from '../../../imports/types/ClientTypes';
import { getClient } from '../../start/createBot';
import { logger } from '../../../utils/Utils';

export default function HelpCommand({ msg, args }: CommandParams): any {
    const client: CustomClient | undefined = getClient();
    if(!client) return logger.error("Failed to fetch client");
    const command_name: string | undefined = args?.shift()?.toUpperCase();
    if (command_name) return msg.channel.send(listOne(client, command_name));
    return msg.channel.send(listAll(client));
}

function listAll(client: CustomClient) {
    const filtered_commands: any = {};
    client.commands?.forEach((command: ParentCommand) => {
        if (!filtered_commands[command.type]) filtered_commands[command.type] = [];
        filtered_commands[command.type].push(formatCommand(command));
    });

    const fields = [];
    for (const commands_type in filtered_commands) {
        fields.push({
            name: `${capitalize(commands_type)}:`,
            value: `**${filtered_commands[commands_type].join(', ')}**`,
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

function listOne(client: CustomClient, command_name: string) {
    const command: ParentCommand | undefined = client.commands?.get(command_name);
    if (!command) return;
    const command_uses: string =
        command.uses.length > 0
            ? command.uses.map((use: string[]) => `**${client?.prefix}${use[0]}:** ${use[1]}`).join('\n')
            : 'Unknown';

    return SpecificHelpEmbed(getCommandName(), command.description, command_uses, command.type);

    function getCommandName(): string {
        if (command?.disabled) return `${command?.name} (DISABLED)`;
        return `${command?.name}`;
    }
}
