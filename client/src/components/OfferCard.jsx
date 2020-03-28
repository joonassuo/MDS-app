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
			<div className="offer-card">
				<div className="user-info">
					<img src={profilePic} alt="profilePic" id="profile-pic" />
					<div id="username">{offer.creator.username}</div>
					<img src="/karma.png" alt="karma" id="karma-icon" />
					<div id="karma">{offer.creator.karma}</div>
				</div>
				<div className="offer-info">
					<h4>{offer.title}</h4>
					<div>Type: {offer.type.toUpperCase()}</div>
					<div>Cost: {offer.cost}</div>
					{offer.type === "lesson" ? (
						<div>Duration: {offer.duration}</div>
					) : null}
				</div>
				<div className="details-button">
					<img
						src="/down-arrow.png"
						alt="arrow down"
						id="down-arrow"
					/>
				</div>
			</div>
		</div>
	);
};

export default OfferCard;
