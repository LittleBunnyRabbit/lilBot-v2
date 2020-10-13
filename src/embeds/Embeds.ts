import { EmbedJson } from '../imports/types/EmbedTypes';

const EmbedBase = (embed: any) => ({ embed });

export const TestEmbed = (): EmbedJson =>
    EmbedBase({
        color: 0x0099ff,
        title: 'Some title',
        url: 'https://discord.js.org',
        author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
            url: 'https://discord.js.org',
        },
        description: 'Some description here',
        thumbnail: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
        ],
        image: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        timestamp: new Date(),
        footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        },
    });

export const HelpEmbed = (fields: { name: string; value: string }[]): EmbedJson =>
    EmbedBase({
        color: 'RANDOM',
        fields,
    });

export const SpecificHelpEmbed = (command_name: string, description: string, uses: string, type: string): EmbedJson =>
    EmbedBase({
        color: 'RANDOM',
        title: command_name,
        description: description,
        fields: [
            {
                name: '**USES:**',
                value: uses,
            },
        ],
        footer: {
            text: `*${type}*`,
        },
    });
