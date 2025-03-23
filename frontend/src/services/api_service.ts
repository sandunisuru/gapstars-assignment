import axios from "axios";
import { ApiResponse } from "../helpers/types/api_response.types";
import { Task } from "../helpers/types/task.types";

const API_BASE_URL = 'http://localhost:3000';
const api = {
    getAllTasks: async (): Promise<Task[]> => {
        try {
            const response = await axios.get<ApiResponse<Task[]>>(`${API_BASE_URL}/api/tasks`);
            return response.data.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(String(error));
            }
        }
    },
    addNewTask: async ({ title, description, priority, depends_on }: { title: string, description: string, priority: number, depends_on: Array<string> }): Promise<Task> => {
        try {
            const response = await axios.post<ApiResponse<Task>>(`${API_BASE_URL}/api/tasks`, { title, description, priority, depends_on });
            return response.data.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(String(error));
            }
        }
    },
    deleteTask: async (id: string): Promise<void> => {
        try {
            await axios.delete<ApiResponse<void>>(`${API_BASE_URL}/api/tasks/${id}`);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(String(error));
            }
        }
    },
    updateTask: async (id: string, task: Task): Promise<void> => {
        try {
            await axios.put<ApiResponse<void>>(`${API_BASE_URL}/api/tasks/${id}`, task);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(String(error));
            }
        }
    }
}

export default api;