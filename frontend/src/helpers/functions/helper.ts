import { Status } from "../enums/status.enum";

export const mapStatusToText = (status: Status): { text: string, color: string} => {
    switch (status) {
        case Status.NOT_DONE:
            return { text: 'Not Done', color: 'warning' };
        case Status.DONE:
            return { text: 'Done', color: 'success' };
        default:
            return { text: '', color: '' };
    }
}