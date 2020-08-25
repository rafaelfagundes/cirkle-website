import _ from "lodash";
import React, { createContext, useContext, useState } from "react";

interface IErrorDialog {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText: string;
}

export interface IErrorContextProps {
  error: IErrorDialog;
  newErrorDialog: (
    showDialog: boolean,
    title: string,
    description: string,
    buttonText?: string
  ) => void;
  closeErrorDialog: () => void;
  showErrorDialog: () => void;
}

const ErrorContext = createContext({} as IErrorContextProps);

export function ErrorProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const error = useErrorProvider();
  return (
    <ErrorContext.Provider value={error}>{children}</ErrorContext.Provider>
  );
}

export const useError = (): IErrorContextProps => {
  return useContext(ErrorContext);
};

function useErrorProvider() {
  const [error, setError] = useState({
    isOpen: false,
    title: "Erro",
    description: "Oops, ocorreu algum erro desconhecido. Tente novamente.",
    buttonText: "OK",
  });

  const newErrorDialog = (
    showDialog: boolean,
    title: string,
    description: string,
    buttonText = "OK"
  ) => {
    const _newError: IErrorDialog = {
      isOpen: showDialog,
      title,
      description,
      buttonText,
    };

    setError(_newError);
  };

  const closeErrorDialog = () => {
    const _error = _.cloneDeep(error);
    _error.isOpen = false;

    setError(_error);
  };

  const showErrorDialog = () => {
    const _error = _.cloneDeep(error);
    _error.isOpen = true;

    setError(_error);
  };

  // Return the user object and auth methods
  return {
    error,
    newErrorDialog,
    closeErrorDialog,
    showErrorDialog,
  };
}

export default ErrorProvider;
