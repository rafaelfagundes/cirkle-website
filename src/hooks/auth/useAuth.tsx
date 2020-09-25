import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import firebase from "../../config/firebase";
import User, { LoginType } from "../../modules/user/User";
import { useDialog } from "../dialog/useDialog";
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
    "Usuário não encontrado. Caso não possua conta, cadastre-se. É rapidinho.",
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
  user: User;
  signin: (email: string, password: string) => Promise<User>;
  updateUser: (user: User) => Promise<User>;
  signinWithGoogle: () => Promise<User>;
  signinWithFacebook: () => Promise<User>;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<User>;
  signout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmPasswordReset: (code: string, password: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
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

async function saveUserDB(
  firebaseUser: firebase.User,
  token: string,
  loginType: LoginType
) {
  try {
    const user: User = {
      loginType,
      name: firebaseUser.displayName,
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      isEmailVerified: firebaseUser.emailVerified,
      phoneNumber: firebaseUser.phoneNumber,
      picture: firebaseUser.photoURL,
    };
    const response = await axios.post("/api/user", { user, token });
    if (response) return response?.data?.data;
    else return null;
  } catch (error) {
    return null;
  }
}

async function getUserDB(idToken: string): Promise<User> {
  try {
    const response = await axios.get("/api/user", { params: { idToken } });
    if (response) return response?.data?.data;
  } catch (error) {
    return null;
  }
}

function useProviderAuth() {
  let localUser = null;
  if (process.browser) {
    localUser = JSON.parse(localStorage.getItem("user"));
  }

  const [user, setUser] = useState(localUser || null);
  const dialogContext = useDialog();

  const saveUserInContextAndLocalStorage = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const signin = async (email: string, password: string) => {
    try {
      const response: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const idToken = await response.user.getIdToken();
      const user = await getUserDB(idToken);
      console.log("signin -> user", user);
      if (user) {
        user.loginType = LoginType.EMAIL_PASSWORD;
        saveUserInContextAndLocalStorage(user);
      } else {
        const savedUser = await saveUserDB(
          response.user,
          idToken,
          LoginType.EMAIL_PASSWORD
        );
        if (savedUser) {
          saveUserInContextAndLocalStorage(savedUser);
        } else {
          dialogContext.newDialog(
            true,
            "Erro ao Tentar Entrar",
            "Não foi possível entrar com o usuário escolhido"
          );
        }
      }
      return user;
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
      const response = await firebase.auth().signInWithPopup(googleProvider);
      const idToken = await response.user.getIdToken();
      console.log("signinWithGoogle -> idToken", idToken);
      const user = await getUserDB(idToken);

      if (user) {
        user.loginType = LoginType.GOOGLE;
        saveUserInContextAndLocalStorage(user);
      } else {
        const savedUser = await saveUserDB(
          response.user,
          idToken,
          LoginType.GOOGLE
        );
        if (savedUser) {
          saveUserInContextAndLocalStorage(savedUser);
        } else {
          dialogContext.newDialog(
            true,
            "Erro ao Tentar Entrar",
            "Não foi possível entrar com o usuário escolhido"
          );
        }
      }

      return user;
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
      const response = await firebase.auth().signInWithPopup(facebookProvider);
      const idToken = await response.user.getIdToken();
      const user = await getUserDB(idToken);
      if (user) {
        user.loginType = LoginType.FACEBOOK;
        saveUserInContextAndLocalStorage(user);
      } else {
        const savedUser = await saveUserDB(
          response.user,
          idToken,
          LoginType.FACEBOOK
        );
        if (savedUser) {
          saveUserInContextAndLocalStorage(savedUser);
        } else {
          dialogContext.newDialog(
            true,
            "Erro ao Tentar Entrar",
            "Não foi possível entrar com o usuário escolhido"
          );
        }
      }
      return user;
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

      const idToken = await response.user.getIdToken();
      const savedUser = await saveUserDB(
        response.user,
        idToken,
        LoginType.EMAIL_PASSWORD
      );
      if (savedUser) {
        saveUserInContextAndLocalStorage(savedUser);
      } else {
        dialogContext.newDialog(
          true,
          "Erro ao Tentar Entrar",
          "Não foi possível encontrar o usuário no sistema."
        );
      }
      return savedUser;
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
      saveUserInContextAndLocalStorage(null);
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

  const updateUser = async (user: User) => {
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      const response = await axios.patch("/api/user", { user, token });
      if (response) {
        saveUserInContextAndLocalStorage(response?.data?.data);
        return response?.data?.data;
      } else return null;
    } catch (error) {
      console.log("updateUser -> error", error);
      return null;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const _user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await _user.reauthenticateWithCredential(credential);

    try {
      await _user.updatePassword(newPassword);
      return true;
    } catch (error) {
      console.log("changePassword -> error", error);
      return false;
    }
  };

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
    updateUser,
    changePassword,
  };
}

export default AuthProvider;