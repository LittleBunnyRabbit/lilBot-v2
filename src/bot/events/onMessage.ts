import Discord, { Message } from 'discord.js';
import { EventHandler } from '../../imports/classes/EventHandler';
import { Command } from '../../imports/classes/Command';
import { logger } from '../../utils/Utils';
import { lilUserJson } from '../../imports/types/UserTypes';
import { addUser, getUserById } from '../../db/databaseHandlers';
import { lilUser } from '../../imports/classes/lilUser';

export default new EventHandler("message", async function(this: any, msg: Discord.Message) {
    if(msg.author.bot || !msg.guild) return; 
    await createUserIfDoesntExist(msg);
    if(msg.content.startsWith(this.prefix)) await executeCommand(this, msg);
});

async function executeCommand(client: any, msg: Discord.Message) {
    const args: string[] = msg.content.slice(client.prefix.length).split(/ +/);
    const command_name = args.shift()?.toUpperCase();
    if(!command_name) return;

    let command: Command | undefined;
    if(await client.commands.has(command_name)) command = await client.commands.get(command_name);

    if(!command) return;

    try { return command.execute(msg, args); }
    catch (error) { return logger.error(`Failed to execute the command:\n${error}`) }
}

async function createUserIfDoesntExist(msg: Message) {
    const user: lilUserJson = await getUserById(msg.author.id);
    if(!user) await addUser(new lilUser(msg.author.id).toJSON());
}