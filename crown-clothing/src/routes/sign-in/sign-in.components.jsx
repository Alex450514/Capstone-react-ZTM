import { auth, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";

import { useEffect } from 'react';

import SignUpForm from "../../components/sign-up-form/form.component";

const SignIn = () => {

//FIREBASE
//Google log-in/signup
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User signed in. You can get the user's information from result.user
          const userDocRef = createUserDocumentFromAuth(result.user)
          // You may also want to save the user data to your component's state or context
        }
      }).catch((error) => {
        // Handle Errors here, such as by displaying an error message
        console.error(error.message);
      });
  }, []);

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    
      return (
        <div>
            <button onClick={handleSignIn}>Sign in with Google</button>
            <SignUpForm />
        </div>
      );
}

export default SignIn;