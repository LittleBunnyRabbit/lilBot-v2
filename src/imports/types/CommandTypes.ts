export type CommandConfig = {
    name: string;
    description: string;
    is_admin: boolean;
    disabled: boolean;
    delete_message: boolean;
    uses: string[][];
    channels: string[];
};
