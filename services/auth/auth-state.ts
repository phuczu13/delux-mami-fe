import { getAuth, onAuthStateChanged, UserInfo } from "firebase/auth";
const auth = getAuth();

export const AuthState = () => {
  onAuthStateChanged(auth, (user) => {
    return user;
  });
};
