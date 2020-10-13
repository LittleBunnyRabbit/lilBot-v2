import { CommandConfig } from '../../imports/types/CommandTypes';

// Normal Commands
import HelpCommand from '../commands/normal/HelpCommand';
import TestCommand from '../commands/normal/TestCommand';
import CanvasCommand from '../commands/normal/CanvasCommand';

// Admin Commands
// Games Commands

const Normal: CommandConfig[] = [
    {
        name: 'HELP',
        description: 'Displays all of the possible commands',
        uses: [
            ['help', 'Sends all of the possible commands'],
            ['help <command>', 'Sends information about the specific command'],
        ],
        channels: [],
        disabled: false,
        function: HelpCommand,
    },
    {
        name: 'TEST',
        description: 'Command for testing',
        uses: [
            ['test', 'Random output'],
        ],
        channels: [],
        disabled: false,
        function: TestCommand,
    },
    {
        name: 'CANVAS',
        description: 'Command to test canvas',
        uses: [
            ['canvas', 'Sends a random canvas image'],
        ],
        channels: [],
        disabled: false,
        function: CanvasCommand,
    },
];

const Admin: CommandConfig[] = [];

const Games: CommandConfig[] = [];

export const commands: { [key: string ]: CommandConfig[]} = { Normal, Admin, Games };
