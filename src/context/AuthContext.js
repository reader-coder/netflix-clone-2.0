import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const authContext = createContext()

export function AuthContextProvider({children}){

    const [user, setUser] = useState({})

    function signUp(email,password){
        createUserWithEmailAndPassword(auth, email,password)
        setDoc(doc(db, 'users', email),{
            savedShows: []
        })
    }

    function logIn (email, password){
        return signInWithEmailAndPassword(auth, email,password)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentuser)=>{
            setUser(currentuser)
        })
        return ()=>{
            unsubscribe();
        }
    })

    return(
        <authContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </authContext.Provider>
         
    )
}

export function UserAuth(){
    return useContext(authContext)
}