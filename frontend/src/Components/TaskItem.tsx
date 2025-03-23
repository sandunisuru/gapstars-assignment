import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Chip, Rating, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Status } from "../helpers/enums/status.enum";
import { mapStatusToText } from "../helpers/functions/helper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import RestoreIcon from '@mui/icons-material/Restore';
import { useTaskContext } from "../Providers/TaskProvider";
import { useDialogContext } from "../Providers/DialogProvider";
import { Task } from "../helpers/types/task.types";

type TaskItemProps = {
    task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }: TaskItemProps) => {

    const { deleteTask, updateTask, setCurrentTask } = useTaskContext();
    const { openWarningDialog, closeWarningDialog, openEditTaskModal } = useDialogContext();

    const clickOnDeleteButton = () => {
        openWarningDialog({
            title: `Delete task`,
            message: `Are you sure you want to delete task: ${task.title}`,
            cancelButtonText: "Cancel",
            successButtonText: "Yes, Delete!",
            onClickCancelButton: () => closeWarningDialog(),
            onClickSuccessButton: () => {
                deleteTask(task.id);
                closeWarningDialog();
            }
        });
    }

    const changeStatus = () => {
        openWarningDialog({
            title: `Change Status`,
            message: `Do you want to mark as ${task.status === Status.DONE ? "Not done" : "Done"}`,
            cancelButtonText: "Cancel",
            successButtonText: "Yes!",
            onClickCancelButton: () => closeWarningDialog(),
            onClickSuccessButton: () => {
                updateTask(task.id, {
                    ...task,
                    status: task.status === Status.DONE ? Status.NOT_DONE : Status.DONE
                })
                closeWarningDialog();
            }
        })
    }

    const onClickEditTask = () => {
        setCurrentTask(task);
        openEditTaskModal();
    }

    return (
        <Card >
            <CardHeader title={task.title}></CardHeader>
            <CardContent>
                <Stack direction="row" spacing={1}>
                    <Chip label={mapStatusToText(task.status).text} color={mapStatusToText(task.status).color as any} size="small" />
                    <Rating value={task.priority} readOnly max={3} />
                </Stack>
                <Typography variant="body2">{task.description}</Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <ButtonGroup variant="contained" aria-label="Basic button group" size="small">
                        <Tooltip title="Edit" placement="top" arrow>
                            <Button onClick={onClickEditTask}>
                                <EditIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title={task.status === Status.DONE ? "Set Not Done" : "Set Done"} placement="top" arrow>
                            <Button onClick={changeStatus}>
                                {task.status === Status.DONE ? <RestoreIcon /> : <DownloadDoneIcon />}
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top" arrow>
                            <Button onClick={clickOnDeleteButton}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>

                    </ButtonGroup>
                </Box>
            </CardActions>
        </Card>
    )
}

export default TaskItem;