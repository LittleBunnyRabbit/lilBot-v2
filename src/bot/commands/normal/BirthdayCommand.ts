import { Message } from 'discord.js';
import { getUsersByParams, updateUser } from '../../../db/databaseHandlers';
import { Command } from '../../../imports/classes/Command';
import { lilUserJson } from '../../../imports/types/UserTypes';
import { BirthdayList } from '../../../embeds/dynamic/BirthdayList';

const sub_commands: string[] = [
    "LIST", "SET", "REMOVE"
];

export default new Command("command_birthday", async function(msg: Message, args: string[]) {
    const sub_command: string | undefined = args.shift()?.toUpperCase();
    switch (sub_command) {
        case "LIST": return listAllBirthdays(msg);
        case "SET": return setBirtday(msg, args);
        case "REMOVE": return removeBirthday(msg);
        default: return msg.channel.send(`Wrong sub command! You need to input one of **${sub_commands.join(", ")}**`);
    }
});

async function listAllBirthdays(msg: Message) {
    const birthday_users: lilUserJson[] = (await getUsersByParams({ birthday: { $exists: true, $ne: null }}) || [])
    return new BirthdayList(msg, birthday_users, 3);
}

async function setBirtday(msg: Message, args: string[]) {
    const day: string | undefined = args.shift();
    const month: string | undefined = args.shift();

    if(!day) return msg.channel.send("Missing argument **<day>**");
    if(!month) return msg.channel.send("Missing argument **<month>**");

    if(Number.isNaN(day)) return msg.channel.send("Argument **<day>** is not a number!");
    if(Number.isNaN(month)) return msg.channel.send("Argument **<month>** is not a number!");

    const day_number: number = parseInt(day);
    const month_number: number = parseInt(month);

    if(day_number > 31 || day_number < 1) return msg.channel.send("Argument **<day>** has a range from **1** to **31**");
    if(month_number > 12 || month_number < 1) return msg.channel.send("Argument **<month>** has a range **1** to **12**");

    await updateUser(msg.author.id, {
        birthday: {
            day: day_number,
            month: month_number
        }
    });

    msg.reply("Birthday stored!");
}

async function removeBirthday(msg: Message) {
    await updateUser(msg.author.id, {
        birthday: null
    });

    msg.reply("Birthday removed!");
}