import { Message } from 'discord.js';
import { TestEmbed } from '../../../embeds/Embeds';
import { Command } from '../../../imports/classes/Command';

export default new Command("command_test", function(msg: Message, args: string[]) {
    return msg.channel.send(TestEmbed());
});