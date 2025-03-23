import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    depends_on: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}