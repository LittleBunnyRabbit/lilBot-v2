export type CommandConfig = {
    name: string;
    description: string;
    is_admin: boolean;
    is_master: boolean;
    disabled: boolean;
    delete_message: boolean;
    uses: string[][];
    channels: string[];
};
