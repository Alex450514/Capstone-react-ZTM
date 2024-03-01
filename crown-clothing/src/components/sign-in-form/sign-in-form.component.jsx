import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";

import { handleSignInGoogle } from "../../routes/sign-in/sign-in.components";

// import { UserContext } from "../../contexts/user.context";

const defaultFormFields =  {
    email: "",
    password: ""
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    //FIREBASE
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Sign-in successful.
            console.log("Signed in user:", userCredential.user);
            // setCurrentUser(userCredential.user);
            // Here, you can redirect the user or update the application's state
            resetFormFields();
        } catch (error) {
            // Handle errors here, such as invalid user credentials
            if (error.code === 'auth/wrong-password') {
                console.error("Wrong password for the given email.");
              } else if (error.code === 'auth/user-not-found') {
                console.error("No user found with the given email.");
              } else if (error.code === 'auth/invalid-credential') {
                console.error("Wrong credentials entered")
              } else {
                // Handle other errors
                console.error("Error signing in:", error);
              }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and passord</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign-in</Button>
                    <Button type="button" handler={handleSignInGoogle} buttonType="google">Google sign-in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;