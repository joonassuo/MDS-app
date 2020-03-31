import React, {useState, useRef} from "react";
import './css/OfferCard.css'

const UserCard = ({creator}) => {
	const avatarUri = creator.username === "Joonas"
	? "https://cdn.intra.42.fr/users/medium_jsuonper.jpg"
	: "https://cdn.intra.42.fr/users/medium_thalme.jpg"
	return (
		<div className="userCard">
			<img className="avatar" src={avatarUri} />
			<div>{creator.username}</div>
			<div>{creator.karma}</div>
		</div>
	)
}

const Title = ({offer}) => {
	return (
			<div className="title">{offer.title}</div>
	)
}

const OfferCard = ({offer}) => {
	const [isActive, setActive] = useState("")
	const [height, setHeight] = useState("0px")
	const content = useRef(null)
	const toggleActive = () => {
		setActive(isActive === "" ? "active" : "")
		setHeight(isActive === "active" ? "0px" : "150px")
	}

	return(
		<div className="accordion_section">
			<div className={`accordion ${isActive}`} onClick = {toggleActive}>
				<UserCard className="userCard" creator={offer.creator} />
				<Title className="title" offer= {offer} />
			</div>
			<div ref={content} style={{height: `${height}`}} className="accordion_content">
			<div className="description" onClick = {toggleActive}>{offer.description} </div>
				<button className={`buy${isActive}`}>Buy</button>
				<button className={`trade${isActive}`}>Trade</button>
			</div>
		</div>
	)
} 

export default OfferCard; 
