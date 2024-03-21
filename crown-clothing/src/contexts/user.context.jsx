import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

import { onSnapshot } from 'firebase/firestore';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
    console.log("dispatched");
    console.log(action);
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => { 
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribeFromAuth = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                // Since createUserDocumentFromAuth returns a DocumentReference, 
                // we can immediately use onSnapshot on this reference.
                createUserDocumentFromAuth(userAuth).then(userDocRef => {
                    const unsubscribeFromDoc = onSnapshot(userDocRef, (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            setCurrentUser({
                                id: docSnapshot.id,
                                ...docSnapshot.data(),
                            });
                        }
                    });
    
                    // Optional: Handle unsubscribe from the document snapshot listener
                    // You may store this unsubscribe function to call it when the component unmounts
                }).catch(error => console.error("Error fetching user document:", error));
            } else {
                setCurrentUser(null);
            }
        });
    
        // Cleanup function to unsubscribe from auth changes when component unmounts
        return () => {
            unsubscribeFromAuth();
            // If you stored the unsubscribe function for doc snapshot, call it here
        };
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}