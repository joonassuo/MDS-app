import React, { useState } from "react";
import OfferCard from "./OfferCard";
import ActiveOffer from "./ActiveOffer";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "./Navbar";
import Addoffer from "./AddOffer";
import "./css/Homepage.css";

const Homepage = () => {
	const [isAdd, setIsAdd] = useState(false);
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const offerList = useSelector((state) => state.offer.offers);
	const user = useSelector((state) => state.auth.user);

	return (
		<div>
			<Navbar user={user} auth={isAuth} />
			{isAdd ? <Addoffer toggleAdd={setIsAdd} /> : null}
			<div className="navigation-bar">
				<div>Browse</div>
				<div>Active</div>
				<div>My offers</div>
			</div>
			<Carousel classname="carousel" interval={null}>
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
				<Carousel.Item>
					<div>
						{offerList && user ? (
							<div className="cards-container">
								{offerList
									.filter(
										(offer) =>
											offer.creator.id === user._id &&
											offer.isActive
									)
									.map((offer) => (
										<ActiveOffer
											offer={offer}
											key={offer._id}
										/>
									))}
							</div>
						) : null}
					</div>
				</Carousel.Item>
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
