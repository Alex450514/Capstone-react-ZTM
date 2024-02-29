import './sign-up-form.styles.scss';
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

import { auth, db } from "../../utils/firebase/firebase.utils";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const defaultFormFields =  {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const isPasswordSecure = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()_\.]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {firstName, lastName, email, password, confirmPassword} = formFields;
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        if (name === "password") {
            setIsPasswordValid(isPasswordSecure(value));
        }

        setFormFields({...formFields, [name]: value})
    }

    //FIREBASE
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!isPasswordValid) {
            alert("Please enter a secure password.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`
            });
            // Reset form fields or redirect user here
    

            // Now create a user document in Firestore
            const userRef = doc(db, "users", user.uid); // Create a document with the user's UID as the document ID
            await setDoc(userRef, {
                displayName: user.displayName,
                email: user.email,
                createdAt: new Date() // Store the current time as the creation time
            });

            resetFormFields();

        } catch (error) {
            console.error("Error signing up:", error.message);
            // Handle sign-up errors here, e.g., email already in use
            const authError = error.message;
            if (authError.includes("email-already-in-use")) {
                alert("Email already in use");
            }
        } 
    };

    return (
            <div className="sign-up-container">
                <h2>Dont have an account?</h2>
                <span>Sign up with email and passord</span>
                <form onSubmit={handleSubmit}>
                    <FormInput label="First Name" required type="text" onChange={handleChange} name="firstName" value={firstName} />

                    <FormInput label="Last Name" required type="text" onChange={handleChange} name="lastName" value={lastName} />

                    <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                    <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
                    <p>{password && !isPasswordValid ? "Password is not secure enough." : ""}</p>

                    <FormInput label="Confirm password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                    <Button buttonType="" type="submit">Sign-up</Button>
                </form>
            </div>
    )

}

export default SignUpForm;