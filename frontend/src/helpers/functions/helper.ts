import { find } from "lodash";
import { Status } from "../enums/status.enum";
import { Task } from "../types/task.types";

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