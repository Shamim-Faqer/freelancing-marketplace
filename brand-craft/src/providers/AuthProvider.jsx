import { createContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config.js";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async ({ name, email, password, photoURL = "" }) => {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, {
      displayName: name.trim(),
      photoURL: photoURL.trim(),
    });
    setUser({ ...credential.user, displayName: name.trim(), photoURL });
    return credential;
  };

  const login = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, loading, register, login, loginWithGoogle, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
