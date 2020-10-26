import dotenv from 'dotenv';
import { createDiscordBot } from './bot/start/createBot';
import { logger } from './utils/Utils';

dotenv.config();
logger.system('.env imported');

(async () => {
    await createDiscordBot();
})();
