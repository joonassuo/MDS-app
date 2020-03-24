import React from "react";

const OfferCard = props => {
	return (
		<div>
			<div className="offerCard"></div>
			<div className="userInfo">
				<img
					className="profile-pic"
					src={props.offer.creator.profilePic}
					alt="profile-pic"
				/>
				<div className="info">
					<h2>{props.offer.creator.username}</h2>
					<div className="karma">
						<img src="/karma.png" alt="karma" />
						{props.offer.creator.karma}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferCard;
