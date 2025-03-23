import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";

export type TaskCreateRequest = {
    title: string;
    description: string;
    priority: Priority;
    depends_on: Array<string>;
}

export type TaskUpdateRequest = {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    depends_on: Array<string>;
}