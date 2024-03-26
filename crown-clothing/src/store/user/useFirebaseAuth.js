import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, onSnapshot } from 'firebase/auth';
import { auth } from '../path/to/firebase/config'; // Adjust path as necessary
import { createUserDocumentFromAuth } from '../path/to/firebase/utils'; // Adjust path as necessary
import { setCurrentUser } from '../path/to/redux/userSlice'; // Adjust path as necessary

export const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        createUserDocumentFromAuth(userAuth).then(userDocRef => {
          const unsubscribeFromDoc = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              dispatch(setCurrentUser({
                id: docSnapshot.id,
                ...docSnapshot.data(),
              }));
            }
          });

          // Return a cleanup function to unsubscribe from the document listener
          return () => unsubscribeFromDoc();
        }).catch(error => console.error("Error fetching user document:", error));
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    // Cleanup function to unsubscribe from auth changes when the component that uses this hook unmounts
    return () => unsubscribeFromAuth();
  }, [dispatch]);
};