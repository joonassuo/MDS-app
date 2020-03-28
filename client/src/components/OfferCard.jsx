import React, {useState, useRef} from "react";
import './css/OfferCard.css'

const Bottom = ({offer}) => {
	return(
		<div>
			<div>{offer.description}
			<button>BUY</button>
			</div>
		</div>
	)
}
const UserCard = ({creator}) => {
	return (
		<div>
			<div>{creator.username}</div>
			<div>{creator.karma}</div>
		</div>
	)
}

const Upper = ({offer}) => {
	return (
		<div>
			<div class="title">{offer.title}</div>
		</div>
	)
}

const OfferCard = ({offer}) => {
	const [isActive, setActive] = useState("")
	const [height, setHeight] = useState("0px")
	const content = useRef(null)
	const toggleActive = () => {
		setActive(isActive === "" ? "active" : "")
		setHeight(isActive === "active" ? "0px" : "100px")
	}

	return(
		<div class="accordion_section">
			<div class={`accordion ${isActive}`} onClick = {toggleActive}>
				<UserCard class="userCard" creator={offer.creator} />
				<Upper class="top" offer= {offer} />
			</div>
			<div ref={content} style={{maxHeight: `${height}`}} onClick = {toggleActive} class="accordion_content">
			{/* <div class="accordion_text"
			dangerouslySetInnerHTML={{ __html: offer.description }} /> */}
			<div class="accordion_text">
				<Bottom class="bottom" offer={offer}/>
			</div>
			</div>
		</div>
	)
} 

export default OfferCard; 
