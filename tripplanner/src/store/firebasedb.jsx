import { createContext, useContext, useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export const FirebaseContext = createContext()

export const FirebaseProvider = ({children}) => {
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAiClLT9vtG96kPrWV-7i00Hu6HUpr345w",
    authDomain: "tripontipai.firebaseapp.com",
    projectId: "tripontipai",
    storageBucket: "tripontipai.firebasestorage.app",
    messagingSenderId: "732823056554",
    appId: "1:732823056554:web:da668b55aaafa3937e20d3",
    measurementId: "G-38FE1MZ8YF"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth(app); // Get Firebase Auth instance
const googleProvider = new GoogleAuthProvider();

const [user, setUser] = useState({});
const [userData, setUserData] = useState({})

useEffect(() => {
  // Monitor authentication state changes
  const unsubscribe = auth.onAuthStateChanged(setUser);
  return unsubscribe;
}, [auth]);

const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // Get user info after successful login
    //   console.log("Logged in user:", user);
      toast.success("Signin Successfull");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // SignIn with Email and Password
const SignInWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get user info after successful login
    //   console.log("Logged in user:", user);
      toast.success("Signin Successfull");
    }  catch (error) {
        if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
          console.error("No user found with this email. Please sign up.");
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get user info after successful login
            // console.log("Logged in user:", user);
            toast.success("Signup Successfull");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        }else if(error.code === 'auth/email-already-in-use)'){
            toast.error("Email is used by different user !!")
        } else {
          toast.error("Signin Error !!")
          console.error("Error signing in:", error);
          return
        }
    }
  };

  const getUsersDataUsingEmail = async (email) => {
      
          if(!email) return;
          // Reference to the 'users' collection
          const usersCollectionRef = collection(db, "users");
      
          // Create a query to find the user with the matching email
          const q = query(usersCollectionRef, where("email", "==", email));
      
          try {
              // Get the documents from Firestore that match the query
              const querySnapshot = await getDocs(q);
          
              // Check if any user data was found
              if (querySnapshot.empty) {
                  return;
              }
          
              // If a user is found, retrieve the data
              const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
              setUserData(data[0])
            } catch (error) {
              console.error("Error fetching user data: ", error);
              throw error; // You can rethrow or handle the error depending on your needs
            }
      }
  
    useEffect(() => {
      if(user){
        getUsersDataUsingEmail(user.email)
      }
    }, [user])


    return <FirebaseContext.Provider value={{user, SignInWithGoogle, Logout, db, SignInWithEmailPassword, userData}}>
        {children}
    </FirebaseContext.Provider>
}

export const useFirebase = () => {
    const firebaseContextValue = useContext(FirebaseContext)
    if(!firebaseContextValue){
        throw new Error('useFirebase used outside of the Provider')
    }
    return firebaseContextValue
}



