import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

//Đăng ký tài khoản
const registerFireBase = async (email:string ,password:string) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }catch(error){
        console.error("Lỗi đăng ký tài khoản",error);
        throw error;
    }
}

const loginUser = async (email:string ,password:string) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch(error){
        console.error("Lỗi đăng nhập",error);
        throw error;
    }
}

const logoutUser = async () => {
    try{
        await signOut(auth);
    }catch(error){
        console.error("Lỗi đăng xuất",error);
        throw error;
    }
}

export {registerFireBase,loginUser,logoutUser};