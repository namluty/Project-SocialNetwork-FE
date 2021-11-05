import { User } from "./User";

export class Comments {
    id?: number;
    content: string;
    user ?: User


    constructor( content: string) {
        this.content = content;
    }
}
