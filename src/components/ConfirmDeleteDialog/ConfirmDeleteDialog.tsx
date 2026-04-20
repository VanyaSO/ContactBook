import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type ConfirmDeleteDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmDeleteDialog = ({ open, onClose, onConfirm }: ConfirmDeleteDialogProps) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this contact? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="error" autoFocus>Delete</Button>
        </DialogActions>
    </Dialog>
);