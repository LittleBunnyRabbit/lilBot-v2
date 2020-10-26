import Discord from 'discord.js';
import { EventHandler } from '../../imports/classes/EventHandler';
import { Command } from '../../imports/classes/Command';
import { logger } from '../../utils/Utils';

export default new EventHandler("message", async function(this: any, msg: Discord.Message) {
    console.log("on message");
    
    if(msg.author.bot || !msg.guild) return; 
    if(msg.content.startsWith(this.prefix)) await executeCommand(this, msg);
});

async function executeCommand(client: any, msg: Discord.Message) {
    console.log({ commands: client.commands });
    
    const args: string[] = msg.content.slice(client.prefix.length).split(/ +/);
    const command_name = args.shift()?.toUpperCase();
    if(!command_name) return;

    let command: Command | undefined;
    if(await client.commands.has(command_name)) command = await client.commands.get(command_name);

    if(!command) return;

    try { return command.execute(msg, args); }
    catch (error) { return logger.error(`Failed to execute the command:\n${error}`) }
}