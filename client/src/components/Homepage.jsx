import React, { useState, useEffect } from "react";
import OfferCard from './OfferCard'
import {useSelector} from 'react-redux'

const Homepage = () => {
    const offerList = useSelector(state => state.offer.offers)

    if (!offerList[0])
            return <div>wait</div>
    else {
        return (
            <div>
                {offerList.map(offer => 
                <OfferCard
                    key = {offer.id}
                    offer = {offer}
                />)}
            </div>
        );
    }
};

export default Homepage;
