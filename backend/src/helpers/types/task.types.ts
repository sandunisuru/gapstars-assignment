import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}