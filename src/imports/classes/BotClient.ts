import Discord from 'discord.js';
import { logger } from '../../utils/Utils';
import { CommandsManager } from './CommandsManager';

export class BotClient {
    readonly client: Discord.Client;
    readonly prefix: string;
    readonly commands_manager: CommandsManager;

    public constructor(prefix: string) {
        this.client = new Discord.Client();
        this.prefix = prefix;
        this.commands_manager = new CommandsManager(this);
        this.addEvents();
        this.client.login(process.env.BOT_TOKEN);
    }

    private addEvents() {
        this.client.on('ready', this.onReady.bind(this));
        this.client.on('message', this.onMessage.bind(this));
    }

    private onReady() {
        const bot_tag: string = `${this?.client.user?.username}#${this?.client.user?.discriminator}`;
        const users_count: number | undefined = this?.client.users.cache.size;
        const channels_count: number | undefined = this?.client.channels.cache.size;
        const guilds_count: number | undefined = this?.client.guilds.cache.size;
    
        return logger.system(
            `Logged in as ${bot_tag} (${users_count} users, ${channels_count} channels, ${guilds_count} guilds)`
        );
    }

    private onMessage(msg: Discord.Message) {
        if (msg.author.bot) return;
        return this.commands_manager.executeCommand(msg);
    }
}
