import React, { useState, useRef } from "react";
import "./css/offerCard.css";

const OfferCard = props => {
	const [isActive, setActive] = useState("");
	const offer = props.offer;

	const profilePic = offer.creator.profilePic
		? offer.creator.profilePic
		: "/default.png";

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
					<button id="buy-button">BUY</button>
				</div>
			) : null}
		</div>
	);
};

export default OfferCard;
