import { createContext, useContext, useState } from "react";
import { WarningDialogOpetions } from "../helpers/types/warning_dialog_options.types";

interface DialogContextType {
    //Create Task Dialog
    isCreateTaskModalOpen: boolean;
    openCreateTaskModal: () => void;
    closeCreateTaskModal: () => void;

    //Warning Dialog
    isWarningDialogOpen: boolean;
    warningDialogOptions: WarningDialogOpetions;
    openWarningDialog: (options: WarningDialogOpetions) => void;
    closeWarningDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogProvider");
    }
    return context;
}

interface DialpgProviderProps {
    children: React.ReactNode;
}

export const DialogProvider: React.FC<DialpgProviderProps> = ({ children }: DialpgProviderProps) => {
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
    const [warningDialogOptions, setWarningDialogOptions] = useState<WarningDialogOpetions>({
        title: "Warning",
        message: "",
        successButtonText: "Okay",
        cancelButtonText: "Cancel",
        onClickCancelButton: () => { },
        onClickSuccessButton: () => { }
    });

const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
}

const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
}

const openWarningDialog = (options: WarningDialogOpetions) => {
    setWarningDialogOptions(options);
    setIsWarningDialogOpen(true);
}

const closeWarningDialog = () => {
    setIsWarningDialogOpen(false);
}

return (
    <DialogContext.Provider value={{
        isCreateTaskModalOpen,
        openCreateTaskModal,
        closeCreateTaskModal,
        isWarningDialogOpen,
        warningDialogOptions,
        openWarningDialog,
        closeWarningDialog
    }}>
        {children}
    </DialogContext.Provider>
);
}