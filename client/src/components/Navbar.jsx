import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./css/navbar.css";
import { logoutUser, loginUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [login, setLogin] = useState(false);
	const isAuth = useSelector(state => state.auth.isAuthenticated);
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
					{isAuth ? (
						<div>
							<div className="menu-item">Menu item 1</div>
							<div className="menu-item">Menu item 2</div>
							<div className="menu-item">Menu item 3</div>
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
