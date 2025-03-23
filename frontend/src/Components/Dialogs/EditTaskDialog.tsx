import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, ListItemText, MenuItem, OutlinedInput, Rating, Select, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useTaskContext } from "../../Providers/TaskProvider";
import { renderValues } from "../../helpers/functions/helper";
import { filter } from "lodash";

type EditTaskDialogPorps = {
    open: boolean;
    onClose: () => void;
    onSave: (task: any) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const EditTaskDialog: React.FC<EditTaskDialogPorps> = ({ open, onClose, onSave }: EditTaskDialogPorps) => {
    const { tasks, currentTask, setCurrentTask } = useTaskContext();

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
                                    onChange={(_event, newValue) => {
                                        setCurrentTask({ ...currentTask, priority: newValue || 1 });
                                    }}
                                    defaultValue={currentTask?.priority || 0}
                                    max={3}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography component="article">Depends on</Typography>
                                <Select
                                    multiple
                                    value={currentTask.depends_on}
                                    onChange={(event) => setCurrentTask({ ...currentTask, depends_on: event.target.value as Array<string> })}
                                    input={<OutlinedInput label="Depends On" />}
                                    renderValue={(selected) => renderValues(selected, tasks)}
                                    MenuProps={MenuProps}
                                >
                                    {filter(tasks, (t) => t.id !== currentTask?.id).map((task) => (
                                        <MenuItem key={task.id} value={task.id}>
                                            <Checkbox checked={currentTask.depends_on.includes(task.id)} />
                                            <ListItemText primary={task.title} />
                                        </MenuItem>
                                    ))}
                                </Select>
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