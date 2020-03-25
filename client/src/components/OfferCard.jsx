import React from "react";

const OfferCard = props => {

	console.log('offercard', props.offer.creator)

	return (
		<div>
			<div className="offerCard">
				<div className="user-info">
					{/* <img
						className="profile-pic"
						src={props.offer.creator.profilePic}
						alt="profile-pic"
					/> */}
					<div className="info">
						{<h2>{props.offer.creator.username}</h2>}
						<div className="karma">
							<img src="/karma.png" alt="karma" />
							{props.offer.creator.karma}
						</div>
					</div>
				</div>
				<div className="offer-info"></div>
			</div>
		</div>
	);
};

export default OfferCard;
