import Discord from 'discord.js';
import { CustomClient } from '../../imports/types/ClientTypes';
import { logger } from '../../utils/Utils';
import { getBotCommands, getCommandConfigs } from './botCommands';
import { getBotEvents } from './botEvents';
import { CommandConfig } from '../../imports/types/CommandTypes';

let client: CustomClient;

export const getDiscordClient = (): CustomClient => client;

export async function createDiscordBot(): Promise<CustomClient> {
    client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
    client.prefix = process.env.PREFIX;
    addEvents(client);
    addCommands(client);
    await client.login(process.env.BOT_TOKEN);
    return client;
}

function addEvents(client: any) {
    for(const bot_event of getBotEvents()) {
        try { 
            client.on(bot_event.type, bot_event.execute);
            logger.system(`Event ${bot_event.type} added!`);
        } catch (error) {
            throw new Error(`Failed to add event ${bot_event.type}\n${error}`); 
        }
    }
}

function addCommands(client: any) {
    const commands_configs: {[key: string]: CommandConfig} = getCommandConfigs();
    client.commands = new Discord.Collection();

    for(const bot_command of getBotCommands()) {
        try {
            const command_config: CommandConfig = commands_configs[bot_command._id] as CommandConfig;
            bot_command.addConfig(command_config);
            client.commands.set(command_config.name.toUpperCase(), bot_command);
            logger.system(`Command ${bot_command._id} added!`);   
        } catch (error) {
            throw new Error(`Failed to add command ${bot_command._id}\n${error}`); 
        }
    }
}

