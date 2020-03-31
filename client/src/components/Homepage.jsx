import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./css/Homepage.css";

const Homepage = () => {
	const offerList = useSelector(state => state.offer.offers);

	if (!offerList[0]) return (
	<div>
		<Navbar />
		<div id = "addButton">
			<button className="add">+</button>
		</div>
	</div>
	)
	else {
		return (
			<div>
				<Navbar />
				<div className="cards-container">
					{offerList.map(offer => (
						<OfferCard key={offer.id} offer={offer} />
					))}
				</div>
				<div id = "addButton">
					<button className="add">+</button>
				</div>
			</div>
		);
	}
};

export default Homepage;
