import { auth } from "../../utils/firebase/firebase.utils";
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";

import { useEffect } from 'react';

import SignUpForm from "../../components/sign-up-form/form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './sign-in.styles.scss';

const SignIn = () => {

//FIREBASE
//Google log-in/signup
    
      return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
      );
}

//FIREBASE functions
export const handleSignInGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

export default SignIn;