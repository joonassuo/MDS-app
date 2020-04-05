import React, { useState } from "react";
import "./css/offerCard.css";
import { useDispatch, useSelector } from "react-redux";
import { modifyOffer } from "../actions/offerActions";

const OfferCard = (props) => {
	const [isActive, setActive] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const offer = props.offer;
	// const dispatch = useDispatch();

	// Set profile pic, or default if none
	const profilePic = offer.creator.profile_picture
		? offer.creator.profile_picture
		: "/default.png";

	// Handle buy of offer
	const handleBuy = () => {
		console.log(offer._id);
		console.log(user);

		modifyOffer(offer._id, user);
	};

	return (
		<div>
			<div className="offer-card" onClick={() => setActive(!isActive)}>
				<div className="user-info">
					<div id="username">{offer.creator.username}</div>
					<img src={profilePic} alt="profilePic" id="profile-pic" />
					<div className="karma-container">
						<img src="/karma.png" alt="karma" id="karma-icon" />
						<div id="karma">{offer.creator.karma}</div>
					</div>
				</div>
				<div className="offer-info">
					<div id="type">{offer.type.toUpperCase()}</div>
					<div id="title">{offer.title.toUpperCase()}</div>
					<div className="const-container">
						<img src="/money-bag.png" alt="money" id="cost-icon" />
						<div id="cost">{offer.cost}</div>
					</div>
					<div id="tags">sports | tennis | skillshare</div>
				</div>
			</div>
			{isActive ? (
				<div className="details-container">
					<div id="description">"{offer.description}"</div>
					<button id="buy-button" onClick={() => handleBuy()}>
						BUY
					</button>
				</div>
			) : null}
		</div>
	);
};

export default OfferCard;
