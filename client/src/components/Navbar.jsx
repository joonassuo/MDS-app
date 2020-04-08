import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./css/navbar.css";
import { logoutUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

const Navbar = (props) => {
	const [showMenu, setShowMenu] = useState(false);
	const [login, setLogin] = useState(false);
	const notifications = props.user ? props.user.notifications : null;
	const dispatch = useDispatch();

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const onLogout = () => {
		logoutUser()(dispatch);
	};

	const onLogin = () => {
		setLogin(true);
	};

	const Notification = (props) => {
		return (
			<div>
				<div className="notification">
					<div className="n-title">{props.object.title}</div>
					<div className="n-text">{props.object.text}</div>
				</div>
			</div>
		);
	};

	return login ? (
		<Redirect to="/login" />
	) : (
		<div>
			<div className="navbar-container">
				<img
					src="/hamburger.png"
					alt="hamburger"
					id="hamburger"
					onClick={() => toggleMenu()}
				/>
				<img src="/pig.png" alt="logo" id="logo" />
			</div>
			{showMenu ? (
				<div className="hamburger-menu">
					{props.auth ? (
						<div>
							<div className="notifications-container">
								{notifications
									? notifications.map((n) => (
											<Notification object={n} />
									  ))
									: null}
							</div>
							<img
								src="/logout.png"
								alt="logout"
								id="logout"
								onClick={() => onLogout()}
							/>
							<img
								src="/settings.png"
								alt="settings"
								id="settings"
							/>
						</div>
					) : (
						<button id="login-button" onClick={() => onLogin()}>
							LOGIN
						</button>
					)}
				</div>
			) : null}
		</div>
	);
};

export default Navbar;
