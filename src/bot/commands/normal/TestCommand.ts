import { TestEmbed } from '../../../embeds/Embeds';
import { CommandParams } from '../../../imports/types/CommandTypes';

export default function TestCommand({ msg }: CommandParams): any {
    return msg.channel.send(TestEmbed());
}
