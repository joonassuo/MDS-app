import React, { useEffect, Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Homepage from "./components/Homepage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { getOffers } from "./actions/offerActions";

class App extends Component {
	componentDidMount() {
		/* store.dispatch(loadUser()); */
		store.dispatch(getOffers());
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" exact component={Homepage} />
				</Router>
			</Provider>
		);
	}
}

export default App;
