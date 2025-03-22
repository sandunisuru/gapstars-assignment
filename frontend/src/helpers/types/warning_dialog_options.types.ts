export type WarningDialogOpetions = {
    title: string;
    message: string;
    successButtonText: string;
    cancelButtonText: string;
    onClickSuccessButton: (data: any) => void;
    onClickCancelButton: () => void;
}