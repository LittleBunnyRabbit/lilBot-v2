import { lilUserJson } from "../types/UserTypes";

export class lilUser {
    readonly _id: string;
    private time_created: number;
    private is_admin: boolean = false;
    private is_banned: boolean = false;
    private command_counter: number = 0;
    
    public constructor(_id: string) {
        this._id = _id;
        this.time_created = Date.now();
    }

    public toJSON(): lilUserJson {
        return {
            _id: this._id,
            time_created: this.time_created,
            is_admin: this.is_admin,
            is_banned: this.is_banned,
            command_counter: this.command_counter
        }
    }
}