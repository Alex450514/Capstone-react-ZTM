import { auth } from "../../utils/firebase/firebase.utils";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

// const logGoogleUser = async () => {
//     const response = await signInAB()
//     console.log(response)
// }

const SignIn = () => {
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    
      return (
        <button onClick={handleSignIn}>Sign in with Google</button>
      );
}

export default SignIn;