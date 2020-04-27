import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Oauth from "./components/Oauth";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { getOffers } from "./actions/offerActions";
import AddOffer from "./components/AddOffer";

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
		store.dispatch(getOffers());
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" exact component={Homepage} />
					<Route path="/login" exact component={Login} />
					<Route path="/oauth/42/redirect" exact component={Oauth} />
				</Router>
			</Provider>
		);
	}
}

export default App;
