import Discord from 'discord.js';
import Canvas from 'canvas';

export class CustomCanvas {
    readonly canvas: Canvas.Canvas;
    readonly ctx: Canvas.CanvasRenderingContext2D;
    public opt: any;
    private fun: Function;

    constructor(width: number, height: number, fun: Function) {
        this.canvas = Canvas.createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.fun = fun;
        this.fun.bind(this);
    }

    public create(opt: any): CustomCanvas {
        this.opt = opt;
        this.fun();
        return this;
    }

    public toBuffer(): Buffer {
        return this.canvas.toBuffer();
    }

    public toAttachment(image_name: string): Discord.MessageAttachment {
        return new Discord.MessageAttachment(this.toBuffer(), `${image_name}.png`);
    }

    public getCanvas(): Canvas.Canvas {
        return this.canvas;
    }
}
