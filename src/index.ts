import dotenv from 'dotenv';
import { BotClient } from './imports/classes/BotClient';
import { logger } from './utils/Utils';

dotenv.config();
logger.system('.env imported');

if(process.env.PREFIX) {
    new BotClient(process.env.PREFIX);
}
