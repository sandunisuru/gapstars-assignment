import { find } from "lodash";
import { Status } from "../enums/status.enum";
import { Task } from "../types/task.types";
import { Recurrency } from "../types/recurrency.types";

export const mapStatusToText = (status: Status): { text: string, color: string } => {
    switch (status) {
        case Status.NOT_DONE:
            return { text: 'Not Done', color: 'warning' };
        case Status.DONE:
            return { text: 'Done', color: 'success' };
        default:
            return { text: '', color: '' };
    }
}

export const renderValues = (selected: Array<string>, tasks: Task[]) => {
    return selected.map(item => {
        const task = find(tasks, i => i.id === item);
        return task ? task.title : "";
    }).filter(Boolean).join(", ");
};

export const recurrentTimes: Recurrency[] = [
    { time: 0, text: "None" },
    { time: 1, text: "1 hour" },
    { time: 2, text: "2 hours" },
    { time: 6, text: "6 hours" },
    { time: 12, text: "12 hours" },
    { time: 24, text: "1 Day" },
    { time: 48, text: "2 Days" },
    { time: 168, text: "1 week" },
    { time: 336, text: "2 weeks" },
    { time: 672, text: "1 month" },
    { time: 1344, text: "2 months" },
    { time: 2016, text: "3 months" },
    { time: 4032, text: "6 months" },
    { time: 8064, text: "1 year" }
]