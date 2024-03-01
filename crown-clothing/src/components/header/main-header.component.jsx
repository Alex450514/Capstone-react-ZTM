// import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './main-header.styles.scss';

import { UserContext } from "../../contexts/user.context";

import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";

const Header = () => {
    const { currentUser } = useContext(UserContext);

    //FIREBASE
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log("User signed out successfully");
          // Optionally, redirect the user or update the UI state here
        } catch (error) {
          console.error("Error signing out:", error);
        }
    };
    //////

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {
                        currentUser ? (
                            <div>
                                {currentUser && <span>Welcome, {currentUser.displayName || 'User'}!</span>}
                                <span onClick={handleSignOut} className="nav-link">Sign-out</span>
                            </div>
                        ) : (
                            <Link className="nav-link" to="/sign-in">
                                Sign-in
                            </Link>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Header;