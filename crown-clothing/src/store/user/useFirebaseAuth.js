import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils';
import { setCurrentUser } from './user.action';
import { onSnapshot } from 'firebase/firestore';

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