import { Message } from 'discord.js';
import { TestCanvas } from '../../../canvases/Canvases';
import { Command } from '../../../imports/classes/Command';

export default new Command("command_canvas", function(msg: Message, args: string[]) {
    return msg.channel.send(TestCanvas({ name: "Test"}).toAttachment("test"));
});
