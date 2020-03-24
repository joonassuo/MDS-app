import React, { useState, useEffect } from "react";
import axios from "axios";
import OfferCard from './offercard'

const Homepage = () => {
    const [filterList, setFilterList] = useState([])

    useEffect (() => {
    axios
        .get("/api/offers")
            .then(response => {
                setFilterList(response.data)
            })
            .catch(error => {
                alert(error)
            })
        }, [])

    console.log(filterList)

	return (
		<div>
			<OfferCard offer = {filterList[0]}/>
		</div>
	);
};

export default Homepage;
