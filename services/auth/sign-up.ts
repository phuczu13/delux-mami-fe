import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from "firebase/auth";
const auth = getAuth();
export const SignUpFirebase = async (
  email: string,
  password: string
): Promise<User> => {
  return (await createUserWithEmailAndPassword(auth, email, password)).user;
};
