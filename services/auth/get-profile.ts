import { getAuth, User } from "firebase/auth";
const auth = getAuth();
export const getProfile = (): User | null => {
  return auth.currentUser;
};
