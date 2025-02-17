import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "firebase/auth";
const auth = getAuth();
export const signInFirebase = async (
  email: string,
  password: string
): Promise<User> => {
  return (await signInWithEmailAndPassword(auth, email, password)).user;
};
