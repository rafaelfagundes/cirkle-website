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
import styled from "styled-components";
import Colors from "../../enums/Colors";

const Title = styled.span<{ error: boolean }>`
  font-family: "FuturaPT";
  color: ${(props) => (props.error ? Colors.RED_CRAYOLA : Colors.PRIMARY)};
  font-size: 18;
  text-transform: "uppercase";
`;

function CustomDialog({
  open,
  title,
  buttonText = "OK",
  children,
  error = true,
  onClose,
}: {
  open: boolean;
  title: string;
  buttonText?: string;
  children: string;
  error?: boolean;
  onClose: () => void;
}): JSX.Element {
  const useStyles = makeStyles({
    description: {
      fontFamily: "FuturaPT",
      fontSize: 16,
    },
    button: {
      fontFamily: "FuturaPT",
      fontSize: 16,
    },
  });
  const classes = useStyles();

  return (
    <Dialog fullScreen={false} open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <Title error={error}>{title}</Title>
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
