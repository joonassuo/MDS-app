import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./css/Homepage.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";


const Homepage = () => {
	const offerList = useSelector(state => state.offer.offers);
	const myUser = useSelector(state => state.auth.user);
	const [myList, setMyList] = useState([])
	

	//FILTER FOR MYLIST, CODESPAGHETTI//
	if(myUser && offerList[0] && !myList[0]){
		console.log('inside offerList', offerList)
		console.log('inside myUser', myUser.username)
		const newList = offerList.filter(myOffers => myOffers.creator.username === myUser.username)
		console.log('mylist', myList)
		console.log('newlist', newList)
 		setMyList(newList)
 	}

	if (!offerList[0]) return (
	<div>
		<Navbar />
		<div id = "addButton">
			<button className="add">+</button>
		</div>
	</div>
	)
	else {
		return (
			<div>
				<Navbar />
				<div>
			<Carousel classname="carousel" interval={null} wrap={false}>
				<Carousel.Item className="carousel-item">
					<div>
						<div className="cards-container">
							<div className="list-title">ALL OFFERS</div>
							<div className="list">
							{offerList.map(offer => (
								<OfferCard key={offer.id} offer={offer} />
							))}
							</div>
						</div>
					</div>
				</Carousel.Item>
				<Carousel.Item className="carousel-item">
					<div>
						<div className="cards-container">
						<div className="list-title">MY OFFERS</div>
							{myList.map(offer => (
								<OfferCard key={offer.id} offer={offer} />
							))}
						</div>
					</div>
				</Carousel.Item>
			</Carousel>
			</div>
				<div id = "addButton">
					<button className="add">+</button>
				</div>
			</div>
		);
	}
};

export default Homepage;
