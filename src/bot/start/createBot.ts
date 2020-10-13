import Discord from 'discord.js';
import { Command, ParentCommand } from '../../imports/classes/Command';
import { CustomClient } from '../../imports/types/ClientTypes';
import { commands } from './commandsConfig';
import { events } from './eventsConfig';

let client: CustomClient | undefined;

export const getClient = (): CustomClient | undefined => client;

export function createBot(prefix: string) {
    client = new Discord.Client();
    client.prefix = prefix;

    addEvents(client);
    client.commands = getCommands();

    client.login(process.env.BOT_TOKEN);
    return client;
}

function addEvents(client: CustomClient) {
    for(const event_name in events) client.on(event_name, events[event_name]);
}

function getCommands(): Discord.Collection<string, ParentCommand> {
    const client_commands = new Discord.Collection<string, ParentCommand>();

    const types: { [key: string]: keyof typeof Command } = {
        Normal: "Normal",
        Admin: "Admin",
        Games: "Games"
    };

    for(const command_type in commands) {
        for(const command of commands[command_type]) {
            let command_class_type: keyof typeof Command | undefined = types[command_type];
            client_commands.set(command.name.toUpperCase(), new Command[command_class_type](command));
        }
    }
    
    return client_commands;
}
