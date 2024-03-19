
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from "firebase/firestore";

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

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}