import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";
import { Recurrency } from "./recurrency.types";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    depends_on: Array<string>;
    recurrency: Recurrency;
    createdAt: Date;
    updatedAt: Date;
}