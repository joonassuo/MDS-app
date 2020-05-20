import React, { useState } from "react";
import "./css/activeOffer.css";

const ActiveOffer = (props) => {
	const offer = props.offer;
	const [isActive, setIsActive] = useState(false);
	const levels = [
		{ label: "BEGINNER", color: "green" },
		{ label: "INTERMEDIATE", color: "yellow" },
		{ label: "ADVANCED", color: "blue" },
		{ label: "EXPERT", color: "red" },
	];

	// Get duration in right format
	const durationValue = (duration) => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return hours + ":" + minutes + (minutes < 10 ? "0" : "") + " h";
	};

	// On complete offer handler
	const completeOffer = () => {};

	return (
		<div className="active-offercard">
			<div
				className="active-details"
				onClick={() => setIsActive(!isActive)}
			>
				<div
					id="level"
					style={{
						color: levels[offer.level].color,
					}}
				>
					{levels[offer.level].label}
				</div>
				<div id="active-title">{offer.title.toUpperCase()}</div>
				<img src="/money-bag.png" alt="money" id="cost-icon" />
				<div id="cost">{offer.cost}</div>
				<img src="/clock.png" alt="clock" id="duration-icon" />
				<div id="duration">{durationValue(offer.duration)}</div>
			</div>
			{isActive ? (
				<div>
					<div className="creator-buyer-container">
						<div className="creator-container">
							<div id="seller">SELLER</div>
							<img
								src={offer.creator.profile_picture}
								id="profile-pic"
								alt="profile-pic"
							/>
							<div>
								{props.isBuyer ? offer.creator.username : "YOU"}
							</div>
						</div>
						<div className="buyer-container">
							<div id="buyer">BUYER</div>
							<img
								src={offer.buyer.profile_picture}
								id="profile-pic"
								alt="profile-pic"
							/>
							<div>
								{props.isBuyer ? "YOU" : offer.buyer.username}
							</div>
						</div>
					</div>
					<div className="active-buttons-container">
						<div
							className="active-button"
							id="active-complete"
							onClick={() => completeOffer()}
						>
							COMPLETE
						</div>
						<div id="active-report">Report</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ActiveOffer;
