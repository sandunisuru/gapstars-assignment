import { createContext, useContext, useState } from "react";
import { Task } from "../helpers/types/task.types";
import api from "../services/api_service";
import { Recurrency } from "../helpers/types/recurrency.types";

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    currentTask: Task | null;
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
    isEditTaskModalOpen: boolean;
    openEditTaskModal: () => void;
    closeEditTaskModal: () => void;
    fetchTasks: () => void;
    addNewTask: (task: { title: string, description: string, priority: number, depends_on: Array<string>, recurrency: Recurrency }) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}

interface TaskProviderProps {
    children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }: TaskProviderProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

    const openEditTaskModal = () => {
        setIsEditTaskModalOpen(true);
    }

    const closeEditTaskModal = () => {
        setIsEditTaskModalOpen(false);
    }

    const fetchTasks = async () => {
        const allTasks = await api.getAllTasks();
        setTasks(allTasks);
    }

    const addNewTask = async ({ title, description, priority, depends_on, recurrency }: { title: string, description: string, priority: number, depends_on: Array<string>, recurrency: Recurrency }) => {
        await api.addNewTask({ title, description, priority, depends_on, recurrency });
        fetchTasks();
    }

    const deleteTask = async (id: string) => {
        await api.deleteTask(id);
        fetchTasks();
    }

    const updateTask = async (id: string, task: Task) => {
        await api.updateTask(id, task);
        fetchTasks();
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            currentTask,
            setCurrentTask,
            isEditTaskModalOpen,
            openEditTaskModal,
            closeEditTaskModal,
            fetchTasks,
            addNewTask,
            deleteTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}