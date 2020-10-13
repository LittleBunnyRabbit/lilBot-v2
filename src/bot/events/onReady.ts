import { CustomClient } from '../../imports/types/ClientTypes';
import { logger } from '../../utils/Utils';

export default function onReady(this: CustomClient) {
    const bot_tag: string = `${this.user?.username}#${this.user?.discriminator}`;
    const users_count: number = this.users.cache.size;
    const channels_count: number = this.channels.cache.size;
    const guilds_count: number = this.guilds.cache.size;
    
    return logger.system(
        `Logged in as ${bot_tag} (${users_count} users, ${channels_count} channels, ${guilds_count} guilds)`
    );
}