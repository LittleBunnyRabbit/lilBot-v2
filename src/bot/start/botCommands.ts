import { Command } from '../../imports/classes/Command';
import { CommandConfig } from '../../imports/types/CommandTypes';
import commands_configs from '../../config/commands_config.json';

// Master Commands

// Admin Commands

// Normal Commands
import HelpCommand from '../commands/normal/HelpCommand';
import TestCommand from '../commands/normal/TestCommand';
import CanvasCommand from '../commands/normal/CanvasCommand';
import BirthdayCommand from '../commands/normal/BirthdayCommand';

// Game Commands

const master_commands: Command[] = [];

const admin_commands: Command[] = [];

const normal_commands: Command[] = [
    HelpCommand,
    TestCommand,
    CanvasCommand,
    BirthdayCommand
];

const game_commands: Command[] = [];

export const getBotCommands = (): Command[] => [
    ...master_commands,
    ...admin_commands,
    ...normal_commands,
    ...game_commands
];

export const getCommandConfigs = (): {[key: string]: CommandConfig} => commands_configs;
