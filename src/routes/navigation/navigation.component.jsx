import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser && <span>Hello,{currentUser.displayName}</span>}
          <Link to="/" className="nav-link">
            Home
          </Link>
          {currentUser ? (
            <span onClick={handleSignOut} className="nav-link">
              Sign Out
            </span>
          ) : (
            <Link to="/authentication" className="nav-link">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
