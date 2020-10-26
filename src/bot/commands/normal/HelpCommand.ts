import { Command } from '../../../imports/classes/Command';
import { Message } from 'discord.js';
import { getDiscordClient } from '../../start/createBot';
import { CustomClient } from '../../../imports/types/ClientTypes';
import { HelpEmbed } from '../../../embeds/Embeds';

export default new Command("command_help", function(msg: Message, args: string[]) {
    const client: CustomClient =  getDiscordClient();
    if(args?.length > 0) return sendSpecific(client, msg, args[0]?.toUpperCase());
    else return sendAll(client, msg);
});

async function sendSpecific(client: CustomClient, msg: Message, command_name: string) {
    if(!client.commands?.has(command_name)) return msg.channel.send("That command doesn't exist!");
    msg.channel.send(client.commands.get(command_name)?.getEmbed());
}

async function sendAll(client: CustomClient, msg: Message) {

    const admin_commands: string[] = [];
    const normal_commands: string[] = [];

    client.commands?.forEach((command: Command, command_name: string) => {
        const command_string: string = `**${command.getName()}**`;
        if(command.isAdmin()) admin_commands.push(command_name);
        else normal_commands.push(command_name);
    }); 

    msg.channel.send(HelpEmbed(normal_commands.sort().join(", "), admin_commands.sort().join(", ")));
}
