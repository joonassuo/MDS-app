import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./css/navbar.css";
import { logoutUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { getUser, deleteUserNotification } from "../actions/userActions";

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [menuClass, setMenuClass] = useState("slide-in");
  const notifications = props.user ? props.user.notifications : null;
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (showMenu) {
      setMenuClass("slide-out");
      setTimeout(() => {
        setShowMenu(false);
      }, 500);
    } else {
      setMenuClass("slide-in");
      setShowMenu(true);
    }
  };

  const onLogout = () => {
    setShowMenu(false);
    logoutUser()(dispatch);
  };

  const onLogin = () => {
    setLogin(true);
  };

  const countNotifications = () => {
    if (!notifications) return null;

    var count = 0;
    for (let i = 0; i < notifications.length; i++) {
      if (!notifications[i].isRead) count++;
    }
    return count;
  };

  const Notification = (props) => {
    const n = props.notification;
    return (
      <div>
        <div className="notification">
          <div id="n-text">
            {n.buyer.username.toUpperCase()} bought your offer{" "}
            {n.offer.title.toUpperCase()} for {n.offer.cost + " "}
            Schmeckels!
          </div>
          <img
            id="n-delete"
            src="/cancel.png"
            alt="cross"
            onClick={() => {
              deleteUserNotification(props.user._id, n.id);
              setTimeout(() => {
                getUser(props.user._id)(dispatch);
              }, 1000);
            }}
          />
        </div>
      </div>
    );
  };

  const ProfileMenu = () => {
    return (
      <div>
        {props.nCount ? (
          <div id="count-container">
            <div id="notifications-count">{props.nCount}</div>
          </div>
        ) : null}
        <div className="hamburger-container">
          <img
            src="/hamburger.png"
            alt="hamburger"
            id="hamburger"
            onClick={() => toggleMenu()}
          />
        </div>
      </div>
    );
  };

  return login ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <div className="navbar-container">
        <div className="logo-container">
          <img src="/pig.png" alt="logo" id="logo" />
        </div>
        {props.auth ? (
          <div>
            <ProfileMenu nCount={countNotifications()} />
            <div className="wallet-container">
              <img id="wallet-icon" src="/money-bag.png" alt="money" />
              <div id="wallet-amount">{props.user.money}</div>
            </div>
            {showMenu ? (
              <div className={menuClass} id="hamburger-menu">
                <div className="profile-container">
                  <img
                    src={
                      props.user.profile_picture
                        ? props.user.profile_picture
                        : "/default.png"
                    }
                    alt="profilepic"
                    id="menu-profilepic"
                  />
                  <div id="menu-details">
                    <div id="menu-profile-name">
                      {props.user.username.toUpperCase()}
                    </div>
                    <div className="menu-karma-container">
                      <img src="/karma.png" alt="karma" id="menu-karma-icon" />
                      <div id="menu-karma">{props.user.karma}</div>
                    </div>
                  </div>
                </div>
                <div className="notifications-container">
                  {notifications
                    ? notifications.map((n) => (
                        <Notification
                          notification={n}
                          user={props.user}
                          key={n.id}
                        />
                      ))
                    : null}
                </div>
                <img
                  src="/logout.png"
                  alt="logout"
                  id="logout"
                  onClick={() => onLogout()}
                />
                <img src="/settings.png" alt="settings" id="settings" />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="login-button-container">
            <img
              id="login-button"
              src="/login.png"
              alt="login"
              onClick={() => onLogin()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
