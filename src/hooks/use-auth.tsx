import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "pt";

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

  const signin = async (email: string, password: string) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      return response.user;
    } catch (error) {
      throw new Error("Não foi possível logar. Verifique suas credenciais.");
    }
  };

  const signinWithGoogle = async () => {
    try {
      const result = await firebase.auth().signInWithPopup(googleProvider);
      return result.user;
    } catch (error) {
      throw new Error(
        "Não foi possível logar com o Google. Tente novamente mais tarde."
      );
    }
  };

  const signinWithFacebook = async () => {
    try {
      const result = await firebase.auth().signInWithPopup(facebookProvider);
      return result.user;
    } catch (error) {
      throw new Error(
        "Não foi possível logar com o Facebook. Tente novamente mais tarde."
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
      throw new Error(
        "Não foi possível efetuar o cadastro. Tente novamente mais tarde."
      );
    }
  };

  const signout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      throw new Error("Não foi possível deslogar do sistema.");
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(
        "Não foi possível resetar a senha. Tente novamente mais tarde."
      );
    }
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    try {
      await firebase.auth().confirmPasswordReset(code, password);
    } catch (error) {
      throw new Error("");
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
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
