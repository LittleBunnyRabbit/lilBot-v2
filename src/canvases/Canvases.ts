import { CustomCanvas } from '../imports/classes/CustomCanvas';

type TestCanvasOpt = { name: string };
export const TestCanvas = (opt: TestCanvasOpt) =>
    new CustomCanvas(200, 200, function (this: CustomCanvas) {
        this.ctx.font = '30px Impact';
        this.ctx.rotate(0.1);
        this.ctx.fillText(this.opt.name, 50, 100);

        // Draw line under text
        var text = this.ctx.measureText(this.opt.name);
        this.ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        this.ctx.beginPath();
        this.ctx.lineTo(50, 102);
        this.ctx.lineTo(50 + text.width, 102);
        this.ctx.stroke();
    }).create(opt);
