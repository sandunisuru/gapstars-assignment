import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, ListItemText, MenuItem, OutlinedInput, Rating, Select, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useTaskContext } from "../../Providers/TaskProvider";
import { recurrentTimes, renderValues } from "../../helpers/functions/helper";
import { Recurrency } from "../../helpers/types/recurrency.types";
import { find } from "lodash";

type AddTaskDialogProps = {
    open: boolean;
    onClose: () => void;
    onAdd: (task: any) => void;
}

const initialValues = {
    title: '',
    description: '',
    priority: 1,
    depends_on: [] as Array<string>,
    recurrency: { time: 0, text: "None" } as Recurrency
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

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose, onAdd }: AddTaskDialogProps) => {
    const [newTaskFields, setNewTaskFields] = React.useState(initialValues);
    const { tasks } = useTaskContext();

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
                        <Typography component="article">Title</Typography>
                        <TextField
                            required
                            value={newTaskFields.title}
                            onChange={(event) => setNewTaskFields({ ...newTaskFields, title: event.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography component="article">Description</Typography>
                        <TextField
                            multiline
                            rows={4}
                            value={newTaskFields.description}
                            onChange={(event) => setNewTaskFields({ ...newTaskFields, description: event.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography component="article">Priority</Typography>
                        <Rating
                            onChange={(_event, newValue) => {
                                setNewTaskFields({ ...newTaskFields, priority: newValue || 1 });
                            }}
                            defaultValue={newTaskFields.priority}
                            max={3}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography component="article">Depends on</Typography>
                        <Select
                            multiple
                            value={newTaskFields.depends_on}
                            onChange={(event) => setNewTaskFields({ ...newTaskFields, depends_on: event.target.value as Array<string> })}
                            input={<OutlinedInput label="Depends On" />}
                            renderValue={(selected) => renderValues(selected, tasks)}
                            MenuProps={MenuProps}
                        >
                            {tasks.map((task) => (
                                <MenuItem key={task.id} value={task.id}>
                                    <Checkbox checked={newTaskFields.depends_on.includes(task.id)} />
                                    <ListItemText primary={task.title} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <Typography component="article">Recurrency</Typography>
                        <Select
                            value={newTaskFields.recurrency.time}
                            onChange={(event) => setNewTaskFields({ ...newTaskFields, recurrency: find(recurrentTimes, (t) => t.time === parseInt(event.target.value as string)) || initialValues.recurrency })}
                        >
                            {recurrentTimes.map((recurrent) => (
                                <MenuItem value={recurrent.time}>{recurrent.text}</MenuItem>
                            ))}
                        </Select>
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