import { ParentCommand } from "../imports/classes/Command";

// Commands
import Help from "./commands/Help";
import Test from "./commands/Test";

export const getCommands = (): ParentCommand[] => [
    Help,
    Test
];