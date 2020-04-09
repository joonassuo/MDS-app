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
		setShowMenu(false);
		logoutUser()(dispatch);
	};

	const onLogin = () => {
		setLogin(true);
	};

	const Notification = (props) => {
		const n = props.notification;
		return (
			<div>
				<div className="notification">
					<div className="n-text">
						{n.buyer.username.toUpperCase()} bought your offer
						{" " + n.offer.title.toUpperCase()} for{" "}
						{n.offer.cost + " "}
						Schmeckels!
					</div>
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
				{props.auth ? (
					<div className="wallet-container">
						<div id="wallet-details">
							<img
								id="wallet-icon"
								src="/money-bag.png"
								alt="money"
							/>
							<div id="wallet-amount">{props.user.money}</div>
						</div>
					</div>
				) : null}
			</div>
			{showMenu ? (
				<div className="hamburger-menu">
					{props.auth ? (
						<div>
							<div className="profile-container">
								<img
									src={props.user.profile_picture}
									alt="profilepic"
									id="menu-profilepic"
								/>
								<div id="menu-details">
									<div id="menu-profile-name">
										{props.user.username.toUpperCase()}
									</div>
									<div id="menu-view-profile">
										View Your Profile
									</div>
								</div>
							</div>
							<div className="notifications-container">
								{notifications
									? notifications.map((n) => (
											<Notification notification={n} />
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
