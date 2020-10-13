import { TestCanvas } from '../../../canvases/Canvases';
import { CommandParams } from '../../../imports/types/CommandTypes';

export default function CanvasCommand({ msg }: CommandParams): any {
    return msg.channel.send(TestCanvas({ name: "Test"}).toAttachment("test"));
}
