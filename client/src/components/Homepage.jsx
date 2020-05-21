import React, { useState } from "react";
import OfferCard from "./OfferCard";
import ActiveOffer from "./ActiveOffer";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "./Navbar";
import Addoffer from "./AddOffer";
import "./css/Homepage.css";
import { modifyOffer } from "../actions/offerActions";
import { modifyUser } from "../actions/userActions";

const Homepage = () => {
	const [isAdd, setIsAdd] = useState(false);
	const [showCompletePopup, setShowCompletePopup] = useState(false);
	const [toComplete, setToComplete] = useState({});
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const offerList = useSelector((state) => state.offer.offers);
	const user = useSelector((state) => state.auth.user);

	// OFFER COMPLETION SCREEN POPUP
	const CompletePopup = () => {
		const [rating, setRating] = useState(0);

		// Get buyer or seller
		const isCreator = user._id === toComplete.creator.id ? true : false;

		// HANDLE OFFER COMPLETION EVENT
		const handleCompletion = () => {
			if (rating === 0) {
				alert("Please enter rating");
				return;
			}

			// PUT req bodies
			const offerBody = JSON.stringify({
				isActive: false,
				isCompleted: true,
			});
			const userBody = JSON.stringify({
				karma: user.karma + rating * 2,
			});
			const id = isCreator ? toComplete.buyer.id : toComplete.creator.id;

			modifyOffer(toComplete._id, offerBody);
			modifyUser(id, userBody);
		};

		return (
			<div>
				<div
					className="complete-offer-background"
					onClick={() => {
						console.log("click");
						setShowCompletePopup(false);
					}}
				></div>
				<div className="complete-offer-container">
					<div id="complete-title">
						{toComplete.title.toUpperCase()}
					</div>
					<div id="complete-pic-container">
						<img
							id="complete-pic"
							src={
								isCreator
									? toComplete.buyer.profile_picture
									: toComplete.creator.profile_picture
							}
							alt="profile-pic"
						/>
					</div>
					<div>
						Please Rate{" "}
						{isCreator
							? toComplete.buyer.username.toUpperCase()
							: toComplete.creator.username.toUpperCase()}
					</div>
					<div id="complete-star-container">
						<img
							className="complete-star"
							src={rating > 0 ? "/star_full.png" : "/star.png"}
							alt="star"
							onClick={() => setRating(1)}
						/>
						<img
							className="complete-star"
							src={rating > 1 ? "/star_full.png" : "/star.png"}
							alt="star"
							onClick={() => setRating(2)}
						/>
						<img
							className="complete-star"
							src={rating > 2 ? "/star_full.png" : "/star.png"}
							alt="star"
							onClick={() => setRating(3)}
						/>
					</div>
					<div
						id="complete-submit"
						onClick={() => handleCompletion()}
					>
						SUBMIT
					</div>
					<div
						id="complete-cancel"
						onClick={() => setShowCompletePopup(false)}
					>
						CANCEL
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Navbar user={user} auth={isAuth} />
			{isAdd ? <Addoffer toggleAdd={setIsAdd} /> : null}
			{showCompletePopup ? <CompletePopup /> : null}
			<div className="navigation-bar">
				<div>Browse</div>
				<div>Active</div>
				<div>My offers</div>
			</div>
			<Carousel classname="carousel" interval={null}>
				{/*
				--------------BROWSE ALL OFFERS---------------
				*/}
				<Carousel.Item>
					<div>
						{offerList ? (
							<div className="cards-container">
								{offerList
									.filter((offer) => !offer.isActive)
									.map((offer) => (
										<OfferCard
											offer={offer}
											key={offer._id}
										/>
									))}
							</div>
						) : null}
						<img
							src="/add.png"
							alt="plus"
							id="add-button"
							onClick={() => setIsAdd(true)}
						/>
					</div>
				</Carousel.Item>
				{/*
				-------------BROWSE ACTIVE OFFERS--------------
				*/}
				<Carousel.Item>
					<div>
						{offerList && user ? (
							<div className="cards-container">
								{offerList
									.filter(
										(offer) =>
											(offer.creator.id === user._id ||
												offer.buyer.id === user._id) &&
											offer.isActive
									)
									.map((offer) => (
										<ActiveOffer
											offer={offer}
											key={offer._id}
											toggleShow={setShowCompletePopup}
											toComplete={setToComplete}
										/>
									))}
							</div>
						) : null}
					</div>
				</Carousel.Item>
				{/*
				--------------BROWSE YOUR OFFERS--------------
				*/}
				<Carousel.Item>
					<div>
						{offerList && user ? (
							<div className="cards-container">
								{offerList
									.filter(
										(offer) => offer.creator.id === user._id
									)
									.map((offer) => (
										<OfferCard
											offer={offer}
											key={offer._id}
										/>
									))}
							</div>
						) : null}
					</div>
				</Carousel.Item>
			</Carousel>
		</div>
	);
};

export default Homepage;
