import { User, DMChannel, TextChannel, NewsChannel, Message, ReactionCollector, MessageEmbed, MessageReaction } from "discord.js";
import { lilUserJson } from "../../imports/types/UserTypes";
import { addDaySuffix, numberToMonth } from "../../utils/Utils";
import { BirthdaysEmbed } from "../Embeds";

export class BirthdayList {
    private pages: lilUserJson[][] = [];
    private page_size: number;
    private message: Message | undefined;
    private reaction_collector: ReactionCollector | undefined;
    private page: number = 0;
    private valid_reactions: string[] = [
        '⏮️', '◀️', '▶️', '⏭️'
    ];
    private leaderboard_max_time = 1000 * 60 * 1; // works for 1 minute


    private user_id: string;

    constructor(msg: Message, lilusers: lilUserJson[], page_size: number) {
        lilusers = lilusers.sort((a: lilUserJson, b: lilUserJson) => {
            if(!a.birthday || !b.birthday) return 0;
            if(a.birthday?.month < b.birthday?.month) return -1;
            if(a.birthday?.month > b.birthday?.month) return 1;
            if(a.birthday?.day < b.birthday?.day) return -1;
            if(a.birthday?.day > b.birthday?.day) return 1;
            return 0;
        });

        this.user_id = msg.author.id;

        this.page_size = page_size;

        this.createPages(lilusers);

        const { description, footer } = this.getCurrentList();
        msg.channel.send(BirthdaysEmbed(description, footer)).then(this.onFirstSend.bind(this));
    }

    private onFirstSend(send_message: Message) {
        this.valid_reactions.forEach((valid_reaction: string) => send_message.react(valid_reaction));
        this.message = send_message;
        this.reaction_collector = send_message.createReactionCollector(this.collectorFilter.bind(this), { time: this.leaderboard_max_time });
        this.reaction_collector.on("collect", this.onCollect.bind(this));
        this.reaction_collector.on("end", () => {
            this.message?.reactions.removeAll();
        });
    } 

    private createPages(lilusers: lilUserJson[]) {
        this.pages = new Array(Math.ceil(lilusers.length / this.page_size)).fill(0).map(() => {
            return lilusers.splice(0, this.page_size);
        });
    }

    private getCurrentList(): { description: string, footer: string } {
        return {
            description: this.getCurrentUsers().join("\n"),
            footer: `page ${this.page + 1}/${this.pages.length}`
        }
    }

    private getCurrentUsers(): string[] {
        return this.pages[this.page].map((liluser: lilUserJson, i: number) => {
            const birthday_value: string = `${numberToMonth[liluser.birthday?.month || 0]} ${addDaySuffix(liluser.birthday?.day || 0)}`;
            return `**${birthday_value}**: <@${liluser._id}>`;
        });
    }

    private collectorFilter(reaction: MessageReaction, user: User) {
        return !user.bot 
            && user.id === this.user_id
            && this.valid_reactions.includes(reaction.emoji.name);
    }

    private updateEmbed() {
        const old_embed: MessageEmbed | undefined = this.message?.embeds[0];

        if(old_embed) {
            const { description, footer } = this.getCurrentList();
            old_embed.footer = { text: footer };
            old_embed.description = description;

            this.message?.edit(old_embed);
        }
    }

    private onCollect(reaction: MessageReaction, user: User) {
        try { 
            if(user.id == this.user_id) reaction.users.remove(user.id); 
        } catch (error) {}
        
        switch(reaction.emoji.name) {
            case '⏮️': return this.firstPage();
            case '◀️': return this.previusPage();
            case '▶️': return this.nextPage();
            case '⏭️': return this.lastPage();
            default: return;
        }
    }

    private nextPage() {
        if(this.page + 1 <= this.pages.length - 1) {
            this.page++;
            this.updateEmbed();
        }
    }

    private previusPage() {
        if(this.page - 1 >= 0) {
            this.page--;
            this.updateEmbed();
        }
    }

    private lastPage() {
        this.page = this.pages.length - 1;
        this.updateEmbed();
    }

    private firstPage() {
        this.page = 0;
        this.updateEmbed();
    }

    public end() {
        return this.reaction_collector?.stop();
    }
}