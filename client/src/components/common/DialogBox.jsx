import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogBox({
  title,
  open,
  setOpen,
  handleConfirm,
  children,
  doNotClose = false,

  ownCancelFunction,
}) {
  const handleClose = () => {
    if (!doNotClose) setOpen(false);
  };

  return (
    <div>
      <Dialog sx={{ minWidth: "2rem" }} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
          {!ownCancelFunction && (
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          )}
          {ownCancelFunction && (
            <Button onClick={ownCancelFunction}>Cancel</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
