
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5GyrTTeb7M90Guz62cHTzFSjithU_mWU",
    authDomain: "crown-clothing-36a28.firebaseapp.com",
    projectId: "crown-clothing-36a28",
    storageBucket: "crown-clothing-36a28.appspot.com",
    messagingSenderId: "597725410306",
    appId: "1:597725410306:web:f679c8399436135039631b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    //if user data does not exist
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log("error creating the user", error.message);
        }
    }

    //if user data exists
    return userDocRef;
}

// import { initializeApp } from 'firebase/app';
// // import 'firebase/firestore'; // If you're using Firestore
// import { 
//     getAuth, 
//     signInWithRedirect, 
//     signInWithPopup, 
//     GoogleAuthProvider
// } from 'firebase/auth'; // If you're using Firebase Authentication

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyA5GyrTTeb7M90Guz62cHTzFSjithU_mWU",
//     authDomain: "crown-clothing-36a28.firebaseapp.com",
//     projectId: "crown-clothing-36a28",
//     storageBucket: "crown-clothing-36a28.appspot.com",
//     messagingSenderId: "597725410306",
//     appId: "1:597725410306:web:f679c8399436135039631b"
//   };
  
//   // Initialize Firebase
//   const firebaseApp = initializeApp(firebaseConfig);

//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({
//     prompt: "select_account"
//   });
  

//   export const auth = getAuth();
//   export const signInAB = signInWithRedirect(auth, provider);

  //////////////////////////

