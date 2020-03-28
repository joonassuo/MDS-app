import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./css/navbar.css";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const isAuth = useSelector(state => state.auth.isAuthenticated);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
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
							<img src="/logout.png" alt="logout" id="logout" />
							<img
								src="/settings.png"
								alt="settings"
								id="settings"
							/>
						</div>
					) : (
						<div>LOGIN BITCH</div>
					)}
				</div>
			) : null}
		</div>
	);
};

export default Navbar;
