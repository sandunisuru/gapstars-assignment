import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Rating, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useTaskContext } from "../../Providers/TaskProvider";

type EditTaskDialogPorps = {
    open: boolean;
    onClose: () => void;
    onSave: (task: any) => void;
}

const EditTaskDialog: React.FC<EditTaskDialogPorps> = ({ open, onClose, onSave }: EditTaskDialogPorps) => {
    const { currentTask, setCurrentTask } = useTaskContext();

    const onClickClose = () => {
        setCurrentTask(null);
        onClose();
    }

    const onClickSave = () => {
        onSave(currentTask);
        onClickClose();
    }

    return (
        <>
            {currentTask && (
                <Dialog open={open} onClose={onClickClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} direction="column" sx={{ padding: 2 }}>
                            <FormControl>
                                <TextField
                                    required
                                    label="Title"
                                    value={currentTask?.title}
                                    onChange={(event) => setCurrentTask({ ...currentTask, title: event.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={currentTask?.description}
                                    onChange={(event) => setCurrentTask({ ...currentTask, description: event.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography component="article">Priority</Typography>
                                <Rating
                                    onChange={(event, newValue) => {
                                        setCurrentTask({ ...currentTask, priority: newValue || 1 });
                                    }}
                                    defaultValue={currentTask?.priority || 0}
                                    max={3}
                                />
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Box sx={{ flexGrow: 0 }}>
                            <Button onClick={onClickClose}>Cancel</Button>
                            <Button onClick={onClickSave} color="primary">Update</Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

export default EditTaskDialog;