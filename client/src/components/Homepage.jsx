import React, { useState } from "react";
import OfferCard from "./OfferCard";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import "./css/Homepage.css";
//import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Homepage = () => {
	const [isAdd, setIsAdd] = useState(false);
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const offerList = useSelector((state) => state.offer.offers);
	const user = useSelector((state) => state.auth.user);

	return isAdd ? (
		<Redirect to="/addoffer" />
	) : (
		<div>
			<Navbar user={user} auth={isAuth} />
			<div>
				{offerList ? (
					<div className="cards-container">
						{offerList
							.filter((offer) => !offer.isActive)
							.map((offer) => (
								<OfferCard offer={offer} key={offer._id} />
							))}
					</div>
				) : null}
				<img
					src="/add.png"
					alt="plus"
					id="add-button"
					onClick={() => setIsAdd(true)}
				/>
			</div>
		</div>
	);
};

export default Homepage;
