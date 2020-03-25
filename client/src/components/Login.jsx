import React, { useState } from "react";
import { loginUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const dispatch = useDispatch();
	const err = useSelector(state => state.error.msg[0]);

	useEffect(() => {
		setErrorMsg(err);
	});

	const onChangeEmail = e => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const onChangePassword = e => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const onSubmit = () => {
		console.log("onSubmit");

		const user = {
			email,
			password
		};

		loginUser(user)(dispatch);
	};

	return (
		<div>
			<div className="login-container">
				<h2 className="error-msg">{errorMsg}</h2>
				<input
					className="email-field"
					type="text"
					placeholder="email"
					onChange={onChangeEmail}
				/>
				<input
					type="text"
					placeholder="password"
					className="pasword-field"
					onChange={onChangePassword}
				/>
				<button className="submitButton" onClick={onSubmit}>
					LOGIN
				</button>
			</div>
		</div>
	);
};

export default Login;
