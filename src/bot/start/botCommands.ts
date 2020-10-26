import { Command } from '../../imports/classes/Command';
import { CommandConfig } from '../../imports/types/CommandTypes';
import commands_configs from '../../config/commands_config.json';
// Admin Commands

// Normal Commands
import HelpCommand from '../commands/normal/HelpCommand';
import TestCommand from '../commands/normal/TestCommand';
import CanvasCommand from '../commands/normal/CanvasCommand';


// Games Commands

const admin_commands: Command[] = [];

const normal_commands: Command[] = [
    HelpCommand,
    TestCommand,
    CanvasCommand
];

const game_commands: Command[] = [];

export const getBotCommands = (): Command[] => [
    ...admin_commands,
    ...normal_commands,
    ...game_commands
];

export const getCommandConfigs = (): {[key: string]: CommandConfig} => commands_configs;
