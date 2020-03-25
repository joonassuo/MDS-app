import React, { useState } from "react";
import { loginUser, registerUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [isRegister, setIsRegister] = useState(false);
	const dispatch = useDispatch();

	const onChange = (e, type) => {
		e.preventDefault();

		switch (type) {
			case "firstname":
				setFirstname(e.target.value);
			case "lastname":
				setLastname(e.target.value);
			case "username":
				setUsername(e.target.value);
			case "email":
				setEmail(e.target.value);
			case "password":
				setPassword(e.target.value);
			case "confirm-password":
				setConfirm(e.target.value);
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
		} else {
			// Check if password confirmation matches
			if (password != confirm) {
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
			}
		}
	};

	return (
		<div>
			<div className="login-container">
				{isRegister ? (
					<div>
						<input
							type="text"
							className="firstname-field"
							placeholder="First Name"
							onChange={e => onChange(e, "firstname")}
						/>
						<input
							type="text"
							className="lastname-field"
							placeholder="Last Name"
							onChange={e => onChange(e, "lastname")}
						/>
						<input
							type="text"
							className="username-field"
							placeholder="Username"
							onChange={e => onChange(e, "username")}
						/>
					</div>
				) : null}
				<input
					className="email-field"
					type="email"
					placeholder="Email"
					onChange={e => onChange(e, "email")}
				/>
				<input
					type="password"
					placeholder="Password"
					className="pasword-field"
					onChange={e => onChange(e, "password")}
				/>
				{isRegister ? (
					<div>
						<input
							type="password"
							placeholder="Confirm Password"
							className="ocnfirm-pasword-field"
							onChange={e => onChange(e, "confirm-password")}
						/>
					</div>
				) : null}
				<button className="submit-button" onClick={onSubmit}>
					{isRegister ? <h3>REGISTER</h3> : <h3>LOGIN</h3>}
				</button>
				{!isRegister ? (
					<div>
						<h2
							onClick={() => {
								setIsRegister(true);
							}}
						>
							Don't have an account yet?
						</h2>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Login;
