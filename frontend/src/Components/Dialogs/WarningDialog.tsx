import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { WarningDialogOpetions } from "../../helpers/types/warning_dialog_options.types";

type WarningDialogProps = {
    options: WarningDialogOpetions;
    open: boolean;
}

const WarningDialog: React.FC<WarningDialogProps> = ({ options, open }: WarningDialogProps) => {
    return (
        <Dialog open={open} onClose={options.onClickCancelButton} maxWidth="sm" fullWidth >
            <DialogTitle>{options.title || "Warning"}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} direction="column" sx={{ padding: 2 }}>
                    <Typography>{options.message || ""}</Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Box sx={{ flexGrow: 0 }}>
                    {options.cancelButtonText !== "" && (<Button onClick={options.onClickCancelButton}>{options.cancelButtonText || "Cancel"}</Button>)}
                    {options.successButtonText !== "" && (<Button onClick={options.onClickSuccessButton} color="primary">{options.successButtonText || "Okay"}</Button>)}
                </Box>
            </DialogActions>
        </Dialog >
    );
}

export default WarningDialog;