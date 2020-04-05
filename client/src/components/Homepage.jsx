import React, { useState } from "react";
import OfferCard from "./OfferCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import AddOffer from "./AddOffer";
import "./css/Homepage.css";

const Homepage = () => {
	const offerList = useSelector((state) => state.offer.offers);
	const [isAdd, setIsAdd] = useState(false);

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
							{offerList.reverse().map((offer) => (
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
