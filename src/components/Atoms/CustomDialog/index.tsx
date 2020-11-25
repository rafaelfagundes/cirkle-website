import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const Title = styled.span<{ error: boolean }>`
  font-family: "Commissioner", sans-serif;
  color: ${(props) => (props.error ? Colors.RED_CRAYOLA : Colors.PRIMARY)};
  font-size: 18;
  text-transform: uppercase;
`;

const Description = styled.span`
  font-family: "Commissioner", sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 16;
  opacity: 0.8;
  font-weight: 500;
`;

const ButtonText = styled.span`
  font-family: "Commissioner", sans-serif;
  color: ${Colors.PRIMARY};
  font-size: 18;
  font-weight: 700;
`;

function CustomDialog({
  open,
  title,
  buttonText = "OK",
  children,
  error = true,
  onClose,
  callback = null,
}: {
  open: boolean;
  title: string;
  buttonText?: string;
  children: string;
  error?: boolean;
  onClose: () => void;
  callback?: () => void;
}): JSX.Element {
  const action = () => {
    onClose();
    if (callback) callback();
  };

  return (
    <Dialog fullScreen={false} open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <Title error={error}>{title}</Title>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Description>{children}</Description>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action} color="primary" autoFocus>
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
