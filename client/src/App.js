import React from "react";
import "./App.css";
import Login from "./components/Login";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Route path="/" exact component={Login} />
			</Router>
		</Provider>
	);
}

export default App;
