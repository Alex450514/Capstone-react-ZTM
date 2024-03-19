// import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './main-header.styles.jsx';

import { UserContext } from "../../contexts/user.context";
import CartContext from "../../contexts/cart.context";

import CardIcon from "../cart-icon/cad-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./main-header.styles.jsx";

const Header = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

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
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to="/shop">
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <div>
                            {currentUser && <span>Welcome, {currentUser.displayName || 'User'}!</span>}
                            <NavLink as="span" onClick={handleSignOut}>Sign-out</NavLink>
                            </div>
                        ) : (
                            <NavLink to="/sign-in">
                                Sign-in
                            </NavLink>
                        )
                    }
                    <CardIcon></CardIcon>
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Header;