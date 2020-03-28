import React, { useState } from "react";
import { loginUser, registerUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./css/login.css";

const Login = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [isRegister, setIsRegister] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const dispatch = useDispatch();

	const onChange = (e, type) => {
		e.preventDefault();

		switch (type) {
			case "firstname":
				setFirstname(e.target.value);
				break;
			case "lastname":
				setLastname(e.target.value);
				break;
			case "username":
				setUsername(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			case "confirm-password":
				setConfirm(e.target.value);
				break;
			default:
				return;
		}
	};

	const onSubmit = () => {
		// Login or register new user
		if (!isRegister) {
			const user = {
				email,
				password
			};
			loginUser(user)(dispatch);
			setIsLoggedIn(true);
		} else {
			// Check if password confirmation matches
			if (password !== confirm) {
				alert("passwords don't match");
			} else {
				const user = {
					firstname,
					lastname,
					username,
					email,
					password
				};
				registerUser(user)(dispatch);
				setIsLoggedIn(true);
			}
		}
	};

	return isLoggedIn ? (
		<Redirect to="/" />
	) : (
		<div>
			<div className="login-container">
				{isRegister ? (
					<div>
						<input
							type="text"
							className="firstname-field h-align"
							placeholder="First Name"
							onChange={e => onChange(e, "firstname")}
						/>
						<input
							type="text"
							className="lastname-field h-align"
							placeholder="Last Name"
							onChange={e => onChange(e, "lastname")}
						/>
						<input
							type="text"
							className="username-field h-align"
							placeholder="Username"
							onChange={e => onChange(e, "username")}
						/>
					</div>
				) : null}
				<input
					className="email-field h-align"
					type="email"
					placeholder="Email"
					onChange={e => onChange(e, "email")}
				/>
				<input
					type="password"
					placeholder="Password"
					className="pasword-field h-align"
					onChange={e => onChange(e, "password")}
				/>
				{isRegister ? (
					<div>
						<input
							type="password"
							placeholder="Confirm Password"
							className="confirm-pasword-field h-align"
							onChange={e => onChange(e, "confirm-password")}
						/>
					</div>
				) : null}
				<button className="submit-button h-align" onClick={onSubmit}>
					{isRegister ? <div>REGISTER</div> : <div>LOGIN</div>}
				</button>
				{!isRegister ? (
					<div className="register-link">
						<div
							onClick={() => {
								setIsRegister(true);
							}}
						>
							Don't have an account yet?
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Login;
