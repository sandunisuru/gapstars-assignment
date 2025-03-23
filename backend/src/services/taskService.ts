import { Status } from "../helpers/enums/status.enum";
import { TaskCreateRequest, TaskUpdateRequest } from "../helpers/types/request.types";
import { Task } from "../helpers/types/task.types";
import uniqid from 'uniqid';
import taskModel from "../models/task.model";
import { Request, Response } from "express";

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, priority, depends_on, recurrency } = req.body as TaskCreateRequest;
        const newTask: Task = {
            title,
            description,
            priority,
            id: uniqid(),
            depends_on,
            recurrency,
            status: Status.NOT_DONE,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const response = await taskModel.create(newTask);
        res.json({ success: true, data: response });
    } catch (error) {
        throw new Error('Failed to create task');
    }
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await taskModel.find();
        res.json({ success: true, data: tasks });
    } catch (error) {
        throw new Error('Failed to fetch tasks');
    }
}

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const task = await taskModel.findOne({
            id
        });
        res.json({ success: true, data: task });
    } catch (error) {
        throw new Error('Failed to fetch task');
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await taskModel.deleteOne
            ({
                id
            });
        res.json({ success: true });
    } catch (error) {
        throw new Error('Failed to delete task');
    }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, priority, status, depends_on, recurrency } = req.body as TaskUpdateRequest;
        const task = await taskModel.findOneAndUpdate
                ({
                    id
                },
                    {
                        title,
                        description,
                        priority,
                        status,
                        depends_on,
                        recurrency,
                        updatedAt: new Date()
                    },
                    {
                        new: true
                    });
        res.json({ success: true, data: task });
    } catch (error) {
        throw new Error('Failed to update task');
    }
}