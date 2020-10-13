import dotenv from 'dotenv';
import { createBot } from './bot/start/createBot';
import { CustomClient } from './imports/types/ClientTypes';
import { logger } from './utils/Utils';

dotenv.config();
logger.system('.env imported');

if(process.env.PREFIX) {
    const client: CustomClient = createBot(process.env.PREFIX);
}
