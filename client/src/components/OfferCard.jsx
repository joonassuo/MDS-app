import React, { useState } from "react";
import "./css/offerCard.css";
import uuid from "react-uuid";
import { useSelector, useDispatch } from "react-redux";
import { modifyOffer, getOffers } from "../actions/offerActions";
import { modifyUser } from "../actions/userActions";

const OfferCard = (props) => {
	const [isActive, setActive] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const offer = props.offer;
	const dispatch = useDispatch();

	// Set profile pic, or default if none
	const profilePic = offer.creator.profile_picture
		? offer.creator.profile_picture
		: "/default.png";

	// Handle buy of offer
	const handleBuy = () => {
		const userData = JSON.stringify({
			_id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
		});

		const body = JSON.stringify({
			notification: {
				_id: uuid(),
				type: "sale",
				offer: props.offer,
				buyer: {
					username: user.username,
					id: user._id,
				},
				isRead: false,
				date: Date.now(),
			},
		});
		modifyOffer(offer._id, userData);
		modifyUser(offer.creator.id, body);
		getOffers()(dispatch);
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
					<div className="cost-container">
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
