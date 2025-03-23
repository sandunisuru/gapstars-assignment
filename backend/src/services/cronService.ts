import { filter } from "lodash";
import taskModel from "../models/task.model";
import { Status } from "../helpers/enums/status.enum";
import { Task } from "../helpers/types/task.types";
import uniqid from 'uniqid';

export const runCronForRecurrentTaskGeneration = async () => {
    const tasks = await taskModel.find();
    const alreadyFinishedTasks = filter(tasks, (t) => t.status === Status.DONE);
    const alreadyEligibleTasks = filter(alreadyFinishedTasks, (task: Task) => {
        const taskRecurrence = task.recurrency?.time || 0;
        const currentTime = Date.now();
        const selectedTaskCreatedTime = new Date(task.createdAt).getTime();
        if (taskRecurrence > 0) {
            return (currentTime - selectedTaskCreatedTime) / 3600000 > taskRecurrence
        }
    });

    for await (const task of alreadyEligibleTasks as Task[]) {
        const newTask: Task = {
            title: `[Auto] ${task.title} on ${new Date().toISOString().split('T')[0]}`,
            description: `[Auto] - ${task.description}`,
            priority: task.priority,
            id: uniqid(),
            depends_on: task.depends_on,
            recurrency: task.recurrency,
            status: Status.NOT_DONE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await taskModel.create(newTask);
        await taskModel.findOneAndUpdate
            ({
                id: task.id
            },
                {
                    recurrency: { text: "None", time: 0 }
                },
                {
                    new: true
                });
    }
}