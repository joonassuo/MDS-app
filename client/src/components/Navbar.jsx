import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./css/navbar.css";
import { logoutUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";

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
					<div className="n-text">
						{n.buyer.username.toUpperCase()} bought your offer{" "}
						{n.offer.title.toUpperCase()} for {n.offer.cost + " "}
						Schmeckels!
					</div>
				</div>
			</div>
		);
	};

	const ProfileMenu = (props) => {
		if (props.auth) {
			return (
				<div>
					<img
						src="/hamburger.png"
						alt="hamburger"
						id="hamburger"
						onClick={() => toggleMenu()}
					/>
					{props.nCount ? (
						<div id="count-container">
							<div id="notifications-count">{props.nCount}</div>
						</div>
					) : null}
				</div>
			);
		} else {
			return (
				<div>
					<div id="login-button" onClick={() => onLogin()}>
						LOGIN
					</div>
				</div>
			);
		}
	};

	return login ? (
		<Redirect to="/login" />
	) : (
		<div>
			<div className="navbar-container">
				<img src="/pig.png" alt="logo" id="logo" />
				<div className="hamburger-container">
					<ProfileMenu
						auth={props.auth}
						nCount={countNotifications()}
					/>
				</div>
				{props.auth ? (
					<div>
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

						{showMenu ? (
							<div className="hamburger-menu">
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
												<Notification
													notification={n}
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
								<img
									src="/settings.png"
									alt="settings"
									id="settings"
								/>
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Navbar;
