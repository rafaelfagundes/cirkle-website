import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import { useDialog } from "./use-dialog";
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "pt";

const ErrorMessages = {
  "auth/email-already-in-use":
    "O endereço de e-mail já está sendo usado. Talvez você já tenha se cadastrado via Google ou Facebook.",
  "auth/account-exists-with-different-credential":
    "O endereço de e-mail já está sendo usado. Talvez você já tenha se cadastrado via Google ou Facebook.",
  "auth/invalid-email": "O endereço de e-mail é inválido",
  "auth/weak-password":
    "A senha é muito fraca. Use números, caracteres especiais (!@#$%&*) e letras maiúsculas e minúsculas",
  "auth/user-not-found":
    "Usuário não encontrado. Caso não possua conta, cadastre-se. É bem simples.",
  "auth/wrong-password":
    "Não foi possível logar. Verifique se seu email e/ou senha estão corretos.",
  "auth/user-disabled":
    "Esta conta foi desativada. Crie outra conta ou entre com o Google ou Facebook.",
  "auth/popup-blocked":
    "Não foi possível entrar. O navegador bloqueou o popup de acesso à conta. Por favor, habilite a exibição de popups para este site.",
  "auth/popup-closed-by-user":
    "Você fechou o popup de acesso. Caso realmente queira entrar, tente novamente.",
  "auth/cancelled-popup-request":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth-domain-config-required":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth/operation-not-allowed":
    "Não foi possível entrar. Operação não permitida.",
  "auth/operation-not-supported-in-this-environment":
    "Não foi possível entrar. Operação não permitida.",
  "auth/unauthorized-domain":
    "Não foi possível entrar. Operação não permitida.",
  "auth/missing-android-pkg-name":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth/missing-continue-uri":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth/missing-ios-bundle-id":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth/invalid-continue-uri":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth/unauthorized-continue-uri":
    "Não foi possível entrar. Ocorreu um erro desconhecido.",
  "auth/expired-action-code": "O código de recuperação do email expirou.",
  "auth/invalid-action-code": "O código de recuperação do email é inválido.",
};

export interface IAuthContextProps {
  user: firebase.User;
  signin: (email: string, password: string) => Promise<firebase.User>;
  signinWithGoogle: () => Promise<firebase.User>;
  signinWithFacebook: () => Promise<firebase.User>;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<firebase.User>;
  signout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmPasswordReset: (code: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextProps);

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = (): IAuthContextProps => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const dialogContext = useDialog();

  const signin = async (email: string, password: string) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      return response.user;
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Entrar",
        ErrorMessages[error.code]
      );
    }
  };

  const signinWithGoogle = async () => {
    try {
      const result = await firebase.auth().signInWithPopup(googleProvider);
      return result.user;
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Entrar",
        ErrorMessages[error.code]
      );
    }
  };

  const signinWithFacebook = async () => {
    try {
      const result = await firebase.auth().signInWithPopup(facebookProvider);
      console.log("result.user", result.user);
      return result.user;
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Entrar",
        ErrorMessages[error.code]
      );
    }
  };

  const signup = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await response.user.updateProfile({
        displayName,
        photoURL:
          "https://res.cloudinary.com/cirklebr/image/upload/v1598000887/avatar.jpg",
      });

      return response.user;
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Entrar",
        ErrorMessages[error.code]
      );
    }
  };

  const signout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Desconectar",
        "Um erro desconhecido ocorreu ao tentar desconectar."
      );
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Entrar",
        ErrorMessages[error.code]
      );
    }
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    try {
      await firebase.auth().confirmPasswordReset(code, password);
    } catch (error) {
      dialogContext.newDialog(
        true,
        "Erro ao Tentar Entrar",
        ErrorMessages[error.code]
      );
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signinWithFacebook,
    signinWithGoogle,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

export default AuthProvider;
