import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";
import { Recurrency } from "./recurrent.types";

export type Task = {
    id: string;
    title: string;
    description: string;
    depends_on: Array<string>;
    status: Status;
    recurrency: Recurrency;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}