import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import AddOffer from "./AddOffer";
import "./css/Homepage.css";
import { useLocation } from "react-router-dom";
const axios = require("axios");
const queryString = require("query-string");

const Homepage = () => {
	const offerList = useSelector(state => state.offer.offers);
	const [isAdd, setIsAdd] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const params = queryString.parse(location.search);
		const { code } = params;
		console.log(code);
	});

	if (!offerList[0]) return <div>wait</div>;
	else {
		return (
			<div>
				<Navbar />
				{isAdd ? (
					<div className="add-offer-container">
						<AddOffer />
					</div>
				) : (
					<div>
						<div className="cards-container">
							{offerList.reverse().map(offer => (
								<OfferCard offer={offer} />
							))}
						</div>
						<img
							src="/add.png"
							alt="plus"
							id="add-button"
							onClick={() => setIsAdd(true)}
						/>
					</div>
				)}
				<a href="https://api.intra.42.fr/oauth/authorize?client_id=8f7dbe7ac964071bad261bdc3197b8c40b26a2bc5105046c3245ab2635a28ecb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2F42%2Fredirect&response_type=code&scope=public">
					asdasdasdasd
				</a>
			</div>
		);
	}
};

export default Homepage;
