import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Rating, Stack, TextField, Typography } from "@mui/material";
import React from "react";

type AddTaskDialogProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (task: any) => void;
}

const initialValues = {
    title: '',
    description: '',
    priority: 1
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose, onAdd }: AddTaskDialogProps) => {
    const [newTaskFields, setNewTaskFields] = React.useState(initialValues);

    const onClickAdd = () => {
        onAdd(newTaskFields);
        setNewTaskFields(initialValues);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Task</DialogTitle>
            <DialogContent>
                <Stack spacing={2} direction="column" sx={{ padding: 2 }}>
                    <FormControl>
                        <TextField
                            required
                            label="Title"
                            value={newTaskFields.title}
                            onChange={(event) => setNewTaskFields({ ...newTaskFields, title: event.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={newTaskFields.description}
                            onChange={(event) => setNewTaskFields({ ...newTaskFields, description: event.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography component="article">Priority</Typography>
                        <Rating
                            onChange={(event, newValue) => {
                                setNewTaskFields({ ...newTaskFields, priority: newValue || 1 });
                            }}
                            defaultValue={newTaskFields.priority}
                            max={3}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Box sx={{ flexGrow: 0 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClickAdd} color="primary">Add</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default AddTaskDialog;