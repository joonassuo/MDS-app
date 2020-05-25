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
					<div className="n-text">
						{n.buyer.username.toUpperCase()} bought your offer
						{n.offer.title.toUpperCase()} for {n.offer.cost + " "}
						Schmeckels!
					</div>
					<div
						id="n-delete"
						onClick={() => {
							deleteUserNotification(props.user._id, n.id);
							getUser(props.user._id)(dispatch);
						}}
					>
						<img src="/add.png" alt="cross" />
					</div>
				</div>
			</div>
		);
	};

	const ProfileMenu = (props) => {
		if (props.auth) {
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

	/* 	const testClick = () => {
		const activeTab = document.getElementById("carousel-active");
		const browseTab = document.getElementById("carousel-browse");
		const myOfferTab = document.getElementById("carousel-my-offers");
		const indicators = document.getElementsByClassName(
			"carousel-indicators"
		);

		browseTab.classList.remove("active");
		myOfferTab.classList.remove("active");
		activeTab.classList.add("active");

		indicators[0].children[0].classList.remove("active");
		indicators[0].children[1].classList.add("active");
		indicators[0].children[2].classList.remove("active");

		toggleMenu();
	}; */

	return login ? (
		<Redirect to="/login" />
	) : (
		<div>
			<div className="navbar-container">
				<div className="logo-container">
					<img src="/pig.png" alt="logo" id="logo" />
				</div>
				<ProfileMenu auth={props.auth} nCount={countNotifications()} />
				{props.auth ? (
					<div>
						<div className="wallet-container">
							<img
								id="wallet-icon"
								src="/money-bag.png"
								alt="money"
							/>
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
													user={props.user}
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
