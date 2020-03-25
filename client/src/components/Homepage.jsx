import React, { useState, useEffect } from "react";
import OfferCard from './OfferCard'
import {useSelector} from 'react-redux'

const Homepage = () => {
    const offerList = useSelector(state => state.offer.offers)

    console.log('filterlist in homepage', offerList)
    if (!offerList[0])
            return <div>wait</div>
    else {
        return (
            <div>
                {offerList.map(offer => 
                <OfferCard offer = {offer}/>)}
            </div>
        );
    }
};

export default Homepage;
