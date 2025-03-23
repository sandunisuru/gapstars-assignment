import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from "react";
import TaskItem from './TaskItem';
import Filter from './Filter';
import { Status } from '../helpers/enums/status.enum';
import { useTaskContext } from '../Providers/TaskProvider';
import AddTaskDialog from './Dialogs/AddTaskDialog';
import { useDialogContext } from '../Providers/DialogProvider';
import WarningDialog from './Dialogs/WarningDialog';
import EditTaskDialog from './Dialogs/EditTaskDialog';
import { Task } from '../helpers/types/task.types';

const AllTasks: React.FC = () => {
    const [sortBy, setSortBy] = React.useState("status");
    const [direction, setDirection] = React.useState("asc");
    const { tasks, setTasks, fetchTasks, addNewTask, updateTask } = useTaskContext();
    const { isCreateTaskModalOpen, closeCreateTaskModal, isWarningDialogOpen, warningDialogOptions, isEditTaskModalOpen, closeEditTaskModal } = useDialogContext();

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async ({ title, description, priority }: { title: string, description: string, priority: number }) => {
        addNewTask({ title, description, priority });
    }

    const editTask = async (task: Task)  => {
        updateTask(task.id, task);
    }

    useEffect(() => {
        setTasks([...tasks].sort((a, b) => {
            if (sortBy === 'status') {
                if (a.status === b.status) return 0;
                return direction === "asc" ? (a.status === Status.NOT_DONE ? -1 : 1) : (a.status === Status.DONE ? -1 : 1);
            } else if (sortBy === 'priority') {
                return direction === "asc" ? (b.priority - a.priority) : (a.priority - b.priority);
            }
            return 0;
        }));
    }, [sortBy, direction]);

    return (
        <Container>
            <Box sx={{ flexGrow: 0, marginTop: 10 }}>
                <Filter sortBy={sortBy} direction={direction} setSortBy={setSortBy} setDirection={setDirection} />
                <Grid container spacing={1}>
                    {tasks.map(task => (
                        <Grid size={3}>
                            <TaskItem key={task.id} task={task} />
                        </Grid>
                    ))}
                </Grid>
                <AddTaskDialog open={isCreateTaskModalOpen} onClose={closeCreateTaskModal} onAdd={addTask} />
                <EditTaskDialog open={isEditTaskModalOpen} onClose={closeEditTaskModal} onSave={editTask}/>
                <WarningDialog open={isWarningDialogOpen} options={warningDialogOptions}/>
            </Box>
        </Container>
    );
}

export default AllTasks;