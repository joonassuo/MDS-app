import React, { useState } from "react";
import { addOffer, getOffers } from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";
import "./css/addOffer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

const AddOffer = (props) => {
	const [title, setTitle] = useState("");
	const [cost, setCost] = useState(0);
	const [duration, setDuration] = useState(30);
	const [description, setDescription] = useState("");
	const [level, setLevel] = useState(0);
	const [ready, setReady] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const levels = [
		{ label: "BEGINNER", color: "green" },
		{ label: "INTERMEDIATE", color: "yellow" },
		{ label: "ADVANCED", color: "blue" },
		{ label: "EXPERT", color: "red" },
	];
	const dispatch = useDispatch();

	const durationValue = (duration) => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return hours + ":" + minutes + (minutes < 10 ? "0" : "") + " h";
	};

	const onChange = (e, type) => {
		switch (type) {
			case "level":
				setLevel(e.target.value);
				break;
			case "cost":
				setCost(e.target.value);
				break;
			case "title":
				setTitle(e.target.value);
				break;
			case "description":
				setDescription(e.target.value);
				break;
			case "duration":
				setDuration(e.target.value);
				break;
			default:
				return;
		}
	};

	const handleSubmit = () => {
		// Get current user from state
		const creator = {
			id: user._id,
			username: user.username,
			karma: user.karma,
			profile_picture: user.profile_picture,
		};

		// Create expires date a week from now
		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		var date = new Date();
		const expiresDate = date.addDays(7);

		const offer = {
			creator,
			cost,
			level,
			expiresDate,
			description,
			duration,
			title,
		};

		addOffer(offer)(dispatch);
		getOffers()(dispatch);
		setReady(true);
	};

	return ready ? (
		<Redirect to="/" />
	) : (
		<div>
			<div
				className="background"
				onClick={() => props.toggleAdd(false)}
			></div>
			<div className="addoffer-container">
				<div className="header">ADD NEW OFFER</div>
				<input
					type="text"
					placeholder="TITLE"
					id="title-field"
					onChange={(e) => onChange(e, "title")}
				/>
				<textarea
					rows="6"
					cols="30"
					placeholder="Give a brief description about your offering"
					id="description-field"
					onChange={(e) => onChange(e, "description")}
				/>
				<div className="level-container">
					<div id="level-label">LEVEL</div>
					<div id="level" style={{ color: levels[level].color }}>
						{levels[level].label}
					</div>
					<input
						type="range"
						min="0"
						max="3"
						className="slider"
						value={level}
						onChange={(e) => onChange(e, "level")}
					/>
				</div>
				<div className="duration-container">
					<div id="duration-label">DURATION</div>
					<div id="duration">{durationValue(duration)}</div>
					<input
						type="range"
						min="0"
						max="240"
						step="15"
						className="slider"
						onChange={(e) => onChange(e, "duration")}
					/>
				</div>
				<input
					type="number"
					name="cost"
					id="cost-field"
					className="center"
					placeholder="PRICE"
					onChange={(e) => onChange(e, "cost")}
				/>
				<button id="submit-button" onClick={() => handleSubmit()}>
					SUBMIT
				</button>
			</div>
		</div>
	);
};

export default AddOffer;
