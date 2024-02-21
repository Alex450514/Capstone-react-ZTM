// import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './main-header.styles.scss';

const Header = () => {
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
                    <Link className="nav-link" to="/sign-in">
                        Sign-in
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Header;