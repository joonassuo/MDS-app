import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./css/Homepage.css";

const Homepage = () => {
	const offerList = useSelector(state => state.offer.offers);

	if (!offerList[0]) return <div>wait</div>;
	else {
		return (
			<div>
				<Navbar />
				<div className="cards-container">
					{offerList.map(offer => (
						<OfferCard key={offer.id} offer={offer} />
					))}
				</div>
				<img src="/add.png" alt="plus" id="add=button" />
			</div>
		);
	}
};

export default Homepage;
