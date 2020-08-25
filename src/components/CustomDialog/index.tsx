import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Colors } from "../../theme/theme";

const useStyles = makeStyles({
  title: {
    fontFamily: "FuturaPT",
    color: Colors.RED_CRAYOLA,
    fontSize: 18,
    textTransform: "uppercase",
  },
  description: {
    fontFamily: "FuturaPT",
    fontSize: 16,
  },
  button: {
    fontFamily: "FuturaPT",
    fontSize: 16,
  },
});

function CustomDialog({
  open,
  title,
  buttonText,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  buttonText: string;
  children: string;
  onClose: () => void;
}): JSX.Element {
  const classes = useStyles();

  return (
    <Dialog fullScreen={false} open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <span className={classes.title}>{title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.description}>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          autoFocus
          className={classes.button}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
