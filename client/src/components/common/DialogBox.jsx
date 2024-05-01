import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogBox({
  title,
  open,
  setOpen,
  children,
  doNotClose = false,
}) {
  const handleClose = () => {
    if (!doNotClose) setOpen(false);
  };

  return (
    <div>
      <Dialog sx={{ minWidth: "2rem" }} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
