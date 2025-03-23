import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";
import { Recurrency } from "./recurrent.types";

export type TaskCreateRequest = {
    title: string;
    description: string;
    priority: Priority;
    recurrency: Recurrency;
    depends_on: Array<string>;
}

export type TaskUpdateRequest = {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    recurrency: Recurrency;
    depends_on: Array<string>;
}