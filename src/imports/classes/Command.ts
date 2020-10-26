import { Message, MessageEmbedOptions } from "discord.js";
import { logger } from "../../utils/Utils";
import { CommandConfig } from "../types/CommandTypes";

export class Command {
    readonly _id: string;
    private command: Function;

    private name: string | undefined;
    private description: string | undefined;
    private is_admin: boolean | undefined;
    private disabled: boolean | undefined;
    private delete_message: boolean | undefined;
    private uses: string[][] | undefined;
    private channels: string[] | undefined;
    
    public constructor(id: string, command: Function) {
        this._id = id;
        this.command = command;
    }

    public addConfig(command_config: CommandConfig) {
        this.name = command_config.name;
        this.description = command_config.description;
        this.is_admin = command_config.is_admin;
        this.disabled = command_config.disabled;
        this.delete_message = command_config.delete_message;
        this.uses = command_config.uses;
        this.channels = command_config.channels;
    }

    public async execute(msg: Message, args: Array<string>) {
        logger.command(`${msg.author.username}#${msg.author.discriminator}`);

        if(!this.canExecute(msg)) return;     
        return this.command(msg, args).then(() => {
            try {
                if(this.delete_message) msg.delete();
            } catch (error) {
                logger.error(`Failed to delete message...\n${error}`)   
            }
        });
    }

    private canExecute(msg: Message): boolean {
        if(this.disabled) return false;
        if(this.is_admin) return this.checkIfAdmin(msg);
        return true;
    }

    private checkIfAdmin(msg: Message): boolean {
        return true;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public isAdmin(): boolean | undefined {
        return this.is_admin;
    }

    public getEmbed(): { embed: MessageEmbedOptions } {
        const title: string = this.name ? `${this.name} ${this.is_admin ? "🛡️" : ""}` : "Unknown name";
        const uses: string | undefined = this.uses?.map((use: string[]) => 
            `- **${process.env.PREFIX}${this.name?.toLowerCase()}${use[0] == "" ? "" : " " + use[0]}**: ${use[1]}`
        ).join("\n");

        const channels: string | undefined = this.channels?.map((channel: string) => `<#${channel}>`).join(", ");

        console.log({ title, uses, channels });
        
        return { embed: {
            color: "RANDOM",
            title,
            description: this.description || "No description",
            fields: [ 
                {
                    name: "Uses:",
                    value: uses || "Unknown"
                },
                {
                    name: "Channels:",
                    value: channels || "All"
                }
            ]
        }};
    }
}