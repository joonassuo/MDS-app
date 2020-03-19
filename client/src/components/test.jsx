import React from "react";
import { useSelector } from "react-redux";

const Test = () => {
	const users = useSelector(state => state.user.users);
	console.log(users);

	return (
		<div>
			<h2>hello</h2>
		</div>
	);
};

export default Test;
