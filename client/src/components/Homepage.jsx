import React, { useState } from "react";
import OfferCard from "./OfferCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import AddOffer from "./AddOffer";
import "./css/Homepage.css";
import { useEffect } from "react";

const Homepage = () => {
	const [offerList, setOfferList] = useState([]);
	const [isAdd, setIsAdd] = useState(false);
	let getOffers = useSelector((state) => state.offer.offers);

	useEffect(() => {
		setOfferList(getOffers);
	});

	if (!offerList[0]) return <div>wait</div>;
	else {
		return (
			<div>
				<Navbar />
				{isAdd ? (
					<div className="add-offer-container">
						<AddOffer setIsAdd={setIsAdd} />
					</div>
				) : (
					<div>
						<div className="cards-container">
							{offerList
								.filter((offer) => !offer.isActive)
								.map((offer) => (
									<OfferCard offer={offer} key={offer._id} />
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
			</div>
		);
	}
};

export default Homepage;
