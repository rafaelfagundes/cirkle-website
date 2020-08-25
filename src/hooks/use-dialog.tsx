import _ from "lodash";
import React, { createContext, useContext, useState } from "react";

interface IDialog {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText: string;
}

export interface IDialogContextProps {
  dialog: IDialog;
  newDialog: (
    showDialog: boolean,
    title: string,
    description: string,
    buttonText?: string
  ) => void;
  closeDialog: () => void;
  showDialog: () => void;
}

const DialogContext = createContext({} as IDialogContextProps);

export function DialogProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const dialog = useDialogProvider();
  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  );
}

export const useDialog = (): IDialogContextProps => {
  return useContext(DialogContext);
};

function useDialogProvider() {
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "Erro",
    description: "Oops, ocorreu algum erro desconhecido. Tente novamente.",
    buttonText: "OK",
  });

  const newDialog = (
    showDialog: boolean,
    title: string,
    description: string,
    buttonText = "OK"
  ) => {
    const _newError: IDialog = {
      isOpen: showDialog,
      title,
      description,
      buttonText,
    };

    setDialog(_newError);
  };

  const closeDialog = () => {
    const _dialog = _.cloneDeep(dialog);
    _dialog.isOpen = false;

    setDialog(_dialog);
  };

  const showDialog = () => {
    const _dialog = _.cloneDeep(dialog);
    _dialog.isOpen = true;

    setDialog(_dialog);
  };

  return {
    dialog,
    newDialog,
    closeDialog,
    showDialog,
  };
}

export default DialogProvider;
