import { Command } from '../../imports/classes/Command';
import { TestEmbed } from '../../imports/embeds/Embeds';
import { CommandParams } from '../../imports/types/CommandTypes';

export default new Command.Normal('Test', 'Test command').setCommand(Test).addUsage('test', 'sends a test output').disable();

function Test({ msg }: CommandParams): any {
    return msg.channel.send(TestEmbed());
}
