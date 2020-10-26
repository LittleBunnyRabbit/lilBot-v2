import { type } from "os";

export type lilUserJson = {
    _id: string;
    time_created: number;
    is_admin: boolean;
    is_banned: boolean;
    command_counter: number;
    birthday?: {
        day: number,
        month: number
    }
};