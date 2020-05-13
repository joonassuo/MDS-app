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
	const levels = [
		{ label: "BEGINNER", color: "green" },
		{ label: "INTERMEDIATE", color: "yellow" },
		{ label: "ADVANCED", color: "blue" },
		{ label: "EXPERT", color: "red" },
	];

	// Set profile pic, or default if none
	const profilePic = offer.creator.profile_picture
		? offer.creator.profile_picture
		: "/default.png";

	// Get duration in right format
	const durationValue = (duration) => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return hours + ":" + minutes + (minutes < 10 ? "0" : "") + " h";
	};

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
					profile_picture: user.profile_picture,
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
				<img src={profilePic} alt="profilePic" id="profile-pic" />
				<div className="user-details">
					<div id="username">{offer.creator.username} | </div>
					<div className="karma-container">
						<img src="/karma.png" alt="karma" id="karma-icon" />
						<div id="karma">{offer.creator.karma}</div>
					</div>
					<div id="date">{offer.createdDate.substring(0, 10)}</div>
				</div>
				<div id="level" style={{ color: levels[offer.level].color }}>
					{levels[offer.level].label}
				</div>
				<div id="title">{offer.title.toUpperCase()}</div>
				{isActive ? (
					<div className="details-container">
						<div id="description">"{offer.description}"</div>
						{user && props.offer.creator.id === user._id ? (
							<div>
								<div id="delete-button">DELETE</div>
							</div>
						) : (
							<div
								id="buy-button"
								onClick={() => {
									if (
										window.confirm(
											"Buy " +
												offer.title.toUpperCase() +
												" for " +
												offer.cost +
												"?"
										)
									) {
										handleBuy();
									}
								}}
							>
								BUY
							</div>
						)}
					</div>
				) : null}
				<img src="/money-bag.png" alt="money" id="cost-icon" />
				<div id="cost">{offer.cost}</div>
				<img src="/clock.png" alt="clock" id="duration-icon" />
				<div id="duration">{durationValue(offer.duration)}</div>
			</div>
		</div>
	);
};

export default OfferCard;
